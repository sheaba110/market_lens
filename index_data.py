import json
from elasticsearch import Elasticsearch 
from config import settings

def index_data():
    es = Elasticsearch(settings.ELASTICSEARCH_URL)
    index_name = settings.SEARCH_INDEX_NAME

    if es.indices.exists(index=index_name):
        es.indices.delete(index=index_name)
    es.indices.create(index=index_name)

    with open("classes.json", "r") as f:
        data = json.load(f)

    for doc in data:
        es.index(index=index_name, document=doc)
    
    print(f"Indexing completed. {len(data)} documents indexed into '{index_name}'.")

if __name__ == "__main__":
    index_data()


