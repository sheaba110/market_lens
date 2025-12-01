# Offer Explorer

## Description 
Offer Explorer are a search engine customised to search and filter the results with the best value for costumers (crawl the pc components from pc components's websits)

## Tech Stack </>
#### Backend: FastAPI/ Elasticsearch/ Scrapy
#### Frontend: React/ Bootsrap

## Installation

### 1. clone repo
```bash
git clone https://github.com/sheaba110/offer_explorer.git
cd offer_explorer
```

### 2. Create a virtual environment

```bash
python -m venv venv
pip install -r requirements.txt
```

### 3. Run the search engine
```bash
python index_data.py
```
### ! if the elasticsearch gived you an error like ``` elastic_transport.ConnectionError: Connection error caused by: ConnectionError(Connection error caused by: NewConnectionError(<urllib3.connection.HTTPConnection object at 0x0********>: Failed to establish a new connection: [WinError 10061]))```try to install it manually on your OS

### 4. Run the Backend
```bash
uvicorn main:app --reload
```
### 5. Run the Frontend
```bash
npm start
```
