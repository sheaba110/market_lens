from elasticsearch import Elasticsearch
from config import settings

class SearchService:
    def __init__(self):
        # Initialize Elasticsearch connection
        self.es = Elasticsearch(
            [settings.ELASTICSEARCH_URL],
            request_timeout=30
        )
        self.index_name = settings.SEARCH_INDEX_NAME
        
    def search(self, query: str):
        """
        Search for documents matching the query in title and source fields.
        Returns Elasticsearch hits.
        """
        search_query = {
            "query": {
                "multi_match": {
                    "query": query,
                    "fields": ["title", "source"]  # Search in title and source (content doesn't exist in data.json)
                }
            },
            "size": 50  # Limit results to 50
        }

        res = self.es.search(index=self.index_name, body=search_query)
        return res['hits']['hits']