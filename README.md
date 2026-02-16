**Market Lens**

**Description:** Market Lens is a search engine for discovering and comparing offers (scrapes PC component listings and indexes them for search).

**Tech Stack:**

- **Backend:** Django=5.2.11

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

```
MarketLens/
├── backend/                           # Backend FastAPI application
│   ├── main.py                    # Main FastAPI application entry point
│   ├── products/                  # Products module
│   │   ├── models.py              # Product database models
│   │   ├── router.py              # Product API routes
│   │   ├── schemas.py             # Product request/response schemas
│   │   └── search_service.py      # Product search service
│   └── users/                     # Users module
│       ├── models.py              # User database models
│       ├── router.py              # User API routes
│       ├── schemas.py             # User request/response schemas
│       └── search.py              # User search functionality
│
├── frontend/                      # React frontend application
│   ├── public/
│   │   └── index.html             # Main HTML template
│   ├── src/
│   │   ├── App.js                 # Main React component
│   │   ├── App.css                # Application styles
│   │   ├── index.js               # React entry point
│   │   └── components/
│   │       └── SearchResults.js   # Search results component
│   ├── package.json               # Node.js dependencies
│   ├── package-lock.json
│   ├── README.md
│   ├── .gitignore
│   └── node_modules/
│
├── offer_crawler/                 # Scrapy web scraping project
│   ├── scrapy.cfg                 # Scrapy configuration
│   └── offer_crawler/             # Scrapy application
│       ├── __init__.py
│       ├── items.py               # Scrapy item definitions
│       ├── middlewares.py          # Scrapy middlewares
│       ├── pipelines.py            # Scrapy data pipelines
│       ├── settings.py             # Scrapy settings
│       └── spiders/                # Web scraper spiders
│           ├── __init__.py
│           ├── badrgrb.py          # Badrgrb shop spider
│           └── sigma.py            # Sigma shop spider   
│       
│       
│
├── config.py                      # Application configuration
├── index_data.py                  # Script to index data in Elasticsearch
├── requirements.txt               # Python dependencies
├── docker-compose.yaml            # Docker compose configuration
├── .env.example                   # Example environment variables
├── .gitignore                     # Git ignore rules
├── README.md                      # Project documentation
└── __pycache__/
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

  - Start the Django server from the project root:
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
  python manage.py runserver
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
  scrapy crawl <spider-name>
  ```

**Elasticsearch note / troubleshooting**

- This project uses the Elasticsearch Python client `elasticsearch==9.2.0`. You must run an Elasticsearch server reachable at the URL in `ELASTICSEARCH_URL`.
- If you see connection errors such as `ConnectionError: Failed to establish a new connection` ensure:
  - Elasticsearch is installed and running locally (default http://localhost:9200), or
  - `ELASTICSEARCH_URL` in your `.venv` file points to a reachable Elasticsearch instance, and
  - The server version is compatible with the client library you have installed.
