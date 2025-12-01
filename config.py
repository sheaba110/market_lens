from pydantic_settings import BaseSettings  


class Settings(BaseSettings):
    ELASTICSEARCH_URL: str = "http://localhost:9200"
    SEARCH_INDEX_NAME: str = "offerexplorer_index"

    class Config:
        env_file = ".venv"

settings = Settings()