# 🔍 Market Lens

> A powerful search engine for discovering and comparing PC component offers across multiple retailers. Market Lens crawls popular PC component websites and indexes them with Elasticsearch to provide fast, efficient searching and filtering.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-5.2.11-darkgreen.svg)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://react.dev/)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Web Scraping](#-web-scraping)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **Full-Text Search**: Fast and efficient search across millions of PC components
- **Real-Time Web Scraping**: Automated crawlers to fetch latest offers from multiple retailers
- **Advanced Filtering**: Filter results by price, specifications, and other criteria
- **Price Comparison**: Compare prices across different retailers and identify the best deals
- **Responsive UI**: Modern React frontend for seamless user experience
- **Scalable Architecture**: Docker support for easy deployment and scaling
- **Elasticsearch Integration**: Powerful indexing and search capabilities


## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Django 5.2.11 |
| **Search/Indexing** | Elasticsearch 9.2.0 |
| **Web Scraping** | Scrapy 2.13.3, lxml 6.0.2 |
| **Frontend** | React 18.2.0, Bootstrap 5.3.8 |
| **Containerization** | Docker, Docker Compose |

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Python** 3.9 or higher
- **Node.js** 14 or higher and npm
- **Elasticsearch** 8.0 or higher
- **Git**
- **Docker & Docker Compose** (optional, for containerized deployment)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/market-lens.git
cd MarketLens
```

### 2. Backend Setup

#### Create and Activate Virtual Environment

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python -m venv venv
source venv/bin/activate
```

#### Install Python Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
cd frontend
npm install
cd ..
```

### 4. Docker Setup (Optional)

If you prefer using Docker:

```bash
docker-compose up -d
```

This will start Elasticsearch and other required services.

## ⚙️ Configuration

### Environment Variables

Set the following environment variables in your system:

```bash
# Elasticsearch Configuration
ELASTICSEARCH_URL=http://localhost:9200
SEARCH_INDEX_NAME=market_lens_index

# Django Configuration (optional)
DEBUG=False
SECRET_KEY=your-secret-key-here
```

### Elasticsearch Setup

Ensure Elasticsearch is running on your system. By default, it listens on `http://localhost:9200`.

**To verify Elasticsearch is running:**
```bash
curl http://localhost:9200
```

### Initialize Search Index

```bash
python index_data.py
```

## 🎯 Usage

### Start Backend Server

From the project root directory:

```bash
python manage.py runserver
```

The Django API will be available at `http://localhost:8000`

### Start Frontend Application

In a new terminal:

```bash
cd frontend
npm start
```

The React application will open at `http://localhost:3000`

### Access the Application

- **Frontend UI**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Django Admin**: http://localhost:8000/admin

## 📂 Project Structure

```
MarketLens/
├── backend/                           # Django Backend Application
│   ├── manage.py                      # Django CLI management script
│   ├── backend/                       # Main Django project configuration
│   │   ├── __init__.py
│   │   ├── settings.py                # Django settings and configuration
│   │   ├── urls.py                    # URL routing configuration
│   │   ├── wsgi.py                    # WSGI application entry point
│   │   └── asgi.py                    # ASGI application entry point
│   └── apps/                          # Django applications (optional)
│
├── frontend/                          # React Frontend Application
│   ├── public/
│   │   └── index.html                 # Main HTML template
│   ├── src/
│   │   ├── App.js                     # Main React component
│   │   ├── App.css                    # Global styles
│   │   ├── index.js                   # React entry point
│   │   └── components/
│   │       └── SearchResults.js       # Search results display component
│   ├── package.json                   # Node.js dependencies
│   └── README.md                      # Frontend documentation
│
├── offer_crawler/                     # Scrapy Web Scraping Project
│   ├── scrapy.cfg                     # Scrapy project configuration
│   └── offer_crawler/                 # Scrapy application
│       ├── __init__.py
│       ├── items.py                   # Data structure definitions
│       ├── middlewares.py              # Custom Scrapy middlewares
│       ├── pipelines.py                # Data processing pipelines
│       ├── settings.py                 # Scrapy configuration
│       └── spiders/                    # Web scraper implementations
│           ├── __init__.py
│           ├── badrgrb.py              # Badrgrb retailer spider
│           └── sigma.py                # Sigma retailer spider
│
├── index_data.py                      # Elasticsearch data indexing script
├── requirements.txt                   # Python dependencies
├── docker-compose.yaml                # Docker compose configuration
└── README.md                          # This file
```

## 📡 API Documentation

### Search Endpoint

**GET** `/api/search?q=<query>&filters=<filters>`

Search for PC components by query string.

**Parameters:**
- `q` (required): Search query
- `filters` (optional): Additional filters (price range, specifications)

**Response:**
```json
{
  "results": [
    {
      "id": "1",
      "name": "Component Name",
      "price": 99.99,
      "retailer": "Retailer Name",
      "url": "https://example.com/product"
    }
  ],
  "total_results": 100
}
```

## 🕷️ Web Scraping

### Available Spiders

- **badrgrb.py**: Scrapes PC components from Badrgrb retailer
- **sigma.py**: Scrapes PC components from Sigma retailer

### Running Spiders Manually

```bash
cd offer_crawler

# Run a specific spider
scrapy crawl badrgrb

# Run with specific options
scrapy crawl badrgrb -a category=gpu

# Export results to JSON
scrapy crawl sigma -o output.json
```

### Adding New Spiders

1. Create a new spider file in `offer_crawler/offer_crawler/spiders/`
2. Inherit from `scrapy.Spider` class
3. Define parsing logic and rules
4. Update Scrapy settings if necessary

## 🔧 Troubleshooting

### Elasticsearch Connection Issues

**Error:** `ConnectionError: Failed to establish a new connection`

**Solution:**
- Verify Elasticsearch is running: `curl http://localhost:9200`
- Check `ELASTICSEARCH_URL` environment variable
- Ensure Elasticsearch version compatibility (8.0+)
- Check firewall and network settings

### Port Already in Use

**Error:** `Port 8000/3000/9200 already in use`

**Solution:**
- Change the port when running: `python manage.py runserver 8001`
- Or kill the process using the port:
  - **Windows:** `netstat -ano | findstr :8000` then `taskkill /PID <PID>`
  - **Linux/Mac:** `lsof -i :8000` then `kill -9 <PID>`

### Module Not Found

**Error:** `ModuleNotFoundError: No module named ...`

**Solution:**
- Activate virtual environment
- Reinstall dependencies: `pip install -r requirements.txt`
- Clear pip cache: `pip cache purge`

### Spider Issues

**Error:** Spider not returning results

**Solution:**
- Check spider configuration and target URL
- Verify website accessibility
- Review Scrapy logs: `scrapy crawl <spider-name> -L DEBUG`
- Check robot.txt compliance

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Contact & Support

- **Issues**: Report a bug on [GitHub Issues](https://github.com/yourusername/market-lens/issues)
- **Questions**: Ask on [GitHub Discussions](https://github.com/yourusername/market-lens/discussions)

---

**Made with ❤️ by the Market Lens Team**
