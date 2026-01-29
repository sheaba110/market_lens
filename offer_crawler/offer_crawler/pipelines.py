# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import psycopg2

# from elasticsearch import Elasticsearch, helpers
# import hashlib


class OfferCrawlerPipeline:

    def process_item(self, item, spider):
        
        return item


# uncomment this when the crawling application finished
# class ElasticsearchPipeline:
#     def __init__(self):
#         # Elasticsearch settings
#         self.es = Elasticsearch(
#             hosts=["http://localhost:9200"],
#             # basic_auth=("user", "password"),
#         )
#         self.buffer = []

#     def process_item(self, item, spider):
#         unique_id = hashlib.md5(item["url"].encode("utf-8")).hexdigest()

#         doc = {
#             "_index": "products_index",
#             "_id": unique_id,
#             "_source": dict(item),
#         }

#         self.buffer.append(doc)

#         if len(self.buffer) >= 100:
#             self.flush_buffer()

#         return item

#     def flush_buffer(self):
#         if self.buffer:
#             helpers.bulk(self.es, self.buffer)
#             self.buffer = []

#     def close_spider(self, spider):
#         self.flush_buffer()
