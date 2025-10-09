from elasticsearch import Elasticsearch
from config import settings

class SearchService:
    def __init__(self):
        self.es = Elasticsearch(settings.ELASTICSEARCH_URL)
        self.index_name = settings.SEARCH_INDEX_NAME
        connection_params = {
            "hosts": [settings.ELASTICSEARCH_URL]
        }
        if settings.ELASTICSEARCH_URL and settings.ELASTICSEARCH_URL:
            connection_params["basic_auth"] = (
                settings.ELASTICSEARCH_URL, 
                
            )
            
        self.es = Elasticsearch(**connection_params)
        self.index_name = settings.SEARCH_INDEX_NAME

        
    def search(self, query: str):
        search_body = {
            "query": {
                "multi_match":{
                    "query": query,
                    "fields": ["title", "content"]
                }
            }
        }

        res = self.es.search(index=self.index_name, body=search_body)
        return res['hits']['hits']