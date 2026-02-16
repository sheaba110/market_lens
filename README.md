# Market Lens

## Description 
Market Lens is a search engine customized to search and filter results with the best value for customers. It crawls PC components from various retailer websites and indexes them for fast searching and comparison.


## Tech Stack
- **Backend:** Django (5.2.11)
- **Search / Indexing:** Elasticsearch Python client (9.2.0)
- **Web Scraping / Crawling:** Scrapy (2.13.3), lxml (6.0.2)
- **Frontend:** React (18.2.0), react-scripts (5.0.1), Bootstrap (5.3.8)

## Project Structure

```
MarketLens/
├── backend/                       # Django backend application
│   ├── manage.py                  # Django management script
│   └── backend/                   # Main Django project configuration
│       ├── __init__.py
│       ├── settings.py            # Django settings and configuration
│       ├── urls.py                # URL routing configuration
│       ├── wsgi.py                # WSGI application entry point
│       └── asgi.py                # ASGI application entry point
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
│   └── README.md                  # Frontend documentation
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
├── index_data.py                  # Script to index data in Elasticsearch
├── requirements.txt               # Python dependencies
├── docker-compose.yaml            # Docker compose configuration
└── README.md                      # Project documentation
```
## Installation

### 1. Clone Repository
```bash
git clone <repo-url>
cd MarketLens
```

### 2. Set Up Python Environment & Install Dependencies
```bash
python -m venv venv
venv\Scripts\activate    # Windows
# or: source venv/bin/activate  # macOS / Linux

pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Configuration
- Set the following environment variables:
  - `ELASTICSEARCH_URL`: URL to your Elasticsearch instance (default: http://localhost:9200)
  - `SEARCH_INDEX_NAME`: Name of the search index (default: market_lens_index)

### 4. Index Sample Data
- To (re)build the search index from local data, run:

  ```bash
  python index_data.py
  ```

## Running the Application

### Run Backend (Django)
- Start the Django server from the project root:

  ```bash
  python manage.py runserver
  ```

### Run Frontend (React)
- From the `frontend` folder:

  ```bash
  cd frontend
  npm install
  npm start
  ```

## Scraping and Crawling

- Spiders are located in `offer_crawler/offer_crawler/spiders/`. To run Scrapy spiders manually:

  ```bash
  cd offer_crawler
  scrapy crawl <spider-name>
  ```



## Elasticsearch Troubleshooting

- This project uses the Elasticsearch Python client (`elasticsearch==9.2.0`). You must have an Elasticsearch server running and reachable at the URL specified in the `ELASTICSEARCH_URL` environment variable.
- If you encounter connection errors like `ConnectionError: Failed to establish a new connection`, verify:
  - Elasticsearch is installed and running (default: http://localhost:9200)
  - `ELASTICSEARCH_URL` environment variable points to the correct Elasticsearch instance
  - The Elasticsearch server version is compatible with the Python client library installed
