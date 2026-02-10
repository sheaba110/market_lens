**Market Lens**

**Description:** Market Lens is a search engine for discovering and comparing offers (scrapes PC component listings and indexes them for search).

**Tech Stack:**

- **Backend:** FastAPI (0.115.4), Starlette (0.41.3)
- **Search / Indexing:** Elasticsearch Python client (9.2.0)
- **Web scraping / crawling:** Scrapy (2.13.3), lxml (6.0.2)
- **Frontend:** React (18.2.0), react-scripts (5.0.1), Bootstrap (5.3.8)

**Quick start**

- **Clone repository:**

  ```bash
  git clone <repo-url>
  cd <repo-name>
  ```
# Market Lens

## Description 
Market Lens are a search engine customised to search and filter the results with the best value for costumers (crawl the pc components from pc components's websits)

## Tech Stack </>
#### Backend: FastAPI/ Elasticsearch/ Scrapy
#### Frontend: React/ Bootsrap
#### Database: MongoDB

## Project Structure

```bash
  app/
  ├── main.py                 
  ├── config.py               
  ├── database.py             
  │
  ├── users/                 
  │   ├── __init__.py
  │   ├── models.py       
  │   ├── router.py       
  │   ├── schemas.py          
  │   └── search.py         
  │
  ├── products/              
  │   ├── __init__.py
  │   ├── router.py
  │   ├── models.py
  │   └── schemas.py
  │
  └── requirements.txt
```
## Installation

### 1. clone repo
```bash
git clone https://github.com/sheaba110/market_lens.git
cd market_lens
```

- **Python environment & dependencies:**

  ```bash
  python -m venv .venv
  .venv\Scripts\activate    # Windows
  # or: source .venv/bin/activate  # macOS / Linux
  pip install --upgrade pip
  pip install -r requirements.txt
  ```

- **Configuration:**

  - The Python settings are defined in [config.py](config.py). By default the app expects environment values to be loaded from a file named `.venv` (see [config.py](config.py)).
  - Create a `.venv` file in the project root (or export the variables in your shell) with at least:

    ```text
    ELASTICSEARCH_URL=http://localhost:9200
    SEARCH_INDEX_NAME=market_lens_index
    ```

- **Index sample data:**

  - To (re)build the search index from local data, run:

  ```bash
  python index_data.py
  ```

- **Run backend API:**

  - Start the FastAPI server from the project root:
```bash
python -m venv venv
pip install -r requirements.txt
```
#### or
```bash
pip install pipenv
pipenv shell
pipenv install
```
### 3. Run the search engine
```bash
python index_data.py
```
  ```bash
  uvicorn app.main:app --reload
  ```

- **Run frontend:**

  - From the `frontend` folder:

  ```bash
  cd frontend
  npm install
  npm start
  ```

**Scraping and crawling**

- Spiders live in the `offer_crawler/offer_crawler/spiders` folder. To run Scrapy spiders manually:

  ```bash
  cd offer_crawler
  scrapy crawl offerspider
  ```

**Elasticsearch note / troubleshooting**

- This project uses the Elasticsearch Python client `elasticsearch==9.2.0`. You must run an Elasticsearch server reachable at the URL in `ELASTICSEARCH_URL`.
- If you see connection errors such as `ConnectionError: Failed to establish a new connection` ensure:
  - Elasticsearch is installed and running locally (default http://localhost:9200), or
  - `ELASTICSEARCH_URL` in your `.venv` file points to a reachable Elasticsearch instance, and
  - The server version is compatible with the client library you have installed.
