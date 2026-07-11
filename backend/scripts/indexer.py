import os
import time
from typing import Any, Dict, List, cast
import meilisearch
import psycopg2
from psycopg2.extras import RealDictCursor

PG_USER = os.getenv("DATABASE_USER")
PG_DATABASE = os.getenv("DATABASE_NAME")
PG_PASSWORD = os.getenv("DATABASE_PASSWORD")
PG_HOST = os.getenv("DATABASE_HOST")
PG_PORT = os.getenv("DATABASE_PORT")
DATABASE_URL = os.getenv("DATABASE_URL")

MEILI_URL = os.getenv("MEILI_URL") or os.getenv("NEXT_PUBLIC_MEILI_URL", "http://search_engine:7700")
MEILI_MASTER_KEY = os.getenv("MEILI_MASTER_KEY") or os.getenv("NEXT_PUBLIC_MEILI_SEARCH_KEY")


def get_db_connection():
    if DATABASE_URL:
        return psycopg2.connect(dsn=DATABASE_URL, cursor_factory=RealDictCursor)

    return psycopg2.connect(
        host=PG_HOST,
        port=PG_PORT,
        user=PG_USER,
        password=PG_PASSWORD,
        database=PG_DATABASE,
        cursor_factory=RealDictCursor,
    )


def init_meilisearch_index():
    client = meilisearch.Client(MEILI_URL, MEILI_MASTER_KEY)
    index = client.index("products")

    index.update_searchable_attributes(["title", "vendor"])
    index.update_filterable_attributes(["vendor", "price"])
    index.update_sortable_attributes(["price"])

    print("Meilisearch index settings updated successfully.")
    return index


def start_indexing(batch_size: int = 1000) -> None:
    db_conn = get_db_connection()
    meili_index = init_meilisearch_index()

    try:
        with db_conn.cursor() as cursor:
            cursor.execute("SELECT COUNT(*) FROM scraped_items;")

            count_result = cast(Dict[str, int], cursor.fetchone())
            total_records = count_result["count"] if count_result else 0

            print(f"Total scraped items found in PostgreSQL: {total_records}")

            offset = 0
            while offset < total_records:
                start_time = time.time()

                cursor.execute(
                    """
                    SELECT
                        item.id::text AS id,
                        item.title,
                        item.image_url,
                        item.url,
                        item.vendor,
                        latest_price.price::float AS price
                    FROM scraped_items AS item
                    LEFT JOIN LATERAL (
                        SELECT price
                        FROM price_history
                        WHERE item_id = item.id
                        ORDER BY scraped_at DESC
                        LIMIT 1
                    ) AS latest_price ON TRUE
                    ORDER BY item.id
                    LIMIT %s OFFSET %s;
                    """,
                    (batch_size, offset),
                )

                raw_data = cursor.fetchall()
                batch_data = cast(List[Dict[str, Any]], raw_data)

                if not batch_data:
                    break

                task = meili_index.add_documents(batch_data)

                duration = time.time() - start_time
                print(
                    f"Sent batch [{offset} to {offset + len(batch_data)}] - Task ID: {task.task_uid} - Time: {duration:.2f} seconds"
                )

                offset += batch_size

        print("Indexing process completed successfully.")

    except Exception as e:
        print(f"An error occurred during indexing: {e}")
    finally:
        db_conn.close()


if __name__ == "__main__":
    start_indexing(batch_size=1000)

