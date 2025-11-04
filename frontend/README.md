# Offer Explorer Frontend

A React.js frontend application with Bootstrap for searching offers using the Offer Explorer API.

## Features

- 🔍 Search interface for offers
- 🎨 Modern Bootstrap-based UI
- 📱 Fully responsive design
- ⚡ Fast and interactive search results
- 🎯 Display of offer details (title, price, image, source, snippet)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:8000` (default)

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Configuration

The frontend connects to the backend API at `http://localhost:8000` by default.

To change the API URL, create a `.env` file in the `frontend` directory:
```
REACT_APP_API_URL=http://localhost:8000
```

## Running the Application

1. Make sure your FastAPI backend is running on port 8000

2. Start the React development server:
```bash
npm start
```

3. The application will open in your browser at `http://localhost:3000`

## Build for Production

To create a production build:

```bash
npm run build
```

The optimized build will be in the `build` directory.

## Project Structure

```
frontend/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   └── SearchResults.js  # Component for displaying search results
│   ├── App.js              # Main application component
│   ├── App.css             # Application styles
│   └── index.js            # Application entry point
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Usage

1. Enter your search query in the search box
2. Click "Search" or press Enter
3. Browse through the results displayed as cards
4. Click "View Offer" to visit the original offer page

## Technologies Used

- React.js 18
- Bootstrap 5
- Axios (HTTP client)
- React Scripts

