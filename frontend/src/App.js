import React, { useState } from 'react';
import { Container, Navbar, Form, Button, Alert, Spinner } from 'react-bootstrap';
import SearchResults from './components/SearchResults';
import axios from 'axios';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await axios.get(`${API_BASE_URL}/search`, {
        params: { query: query.trim() },
        timeout: 10000, // 10 second timeout
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      setResults(response.data.results || []);
    } catch (err) {
      let errorMessage = 'Failed to search. ';
      
      if (err.code === 'ECONNABORTED') {
        errorMessage += 'Request timed out. Please check if the backend server is running at ' + API_BASE_URL;
      } else if (err.code === 'ERR_NETWORK' || err.message.includes('Network Error')) {
        errorMessage += `Network error: Cannot connect to backend server at ${API_BASE_URL}. `;
        errorMessage += 'Please ensure the backend server is running on port 8000.';
      } else if (err.response) {
        // Server responded with error status
        errorMessage += err.response.data?.detail || `Server error: ${err.response.status} ${err.response.statusText}`;
      } else if (err.request) {
        // Request made but no response received
        errorMessage += 'No response from server. Please check if the backend server is running at ' + API_BASE_URL;
      } else {
        errorMessage += err.message || 'Unknown error occurred';
      }
      
      setError(errorMessage);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#">
            <h3 className="mb-0">🔍 Offer Explorer</h3>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <div className="search-section mb-4">
          <Form onSubmit={handleSearch}>
            <div className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder="Search for offers..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                size="lg"
                className="flex-grow-1"
              />
              <Button 
                variant="primary" 
                type="submit" 
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Searching...
                  </>
                ) : (
                  'Search'
                )}
              </Button>
            </div>
          </Form>
        </div>

        {error && (
          <Alert variant="danger" dismissible onClose={() => setError(null)}>
            <Alert.Heading>Error</Alert.Heading>
            <p>{error}</p>
          </Alert>
        )}

        {hasSearched && !loading && (
          <div className="results-info mb-3">
            <h5>
              {results.length === 0 
                ? 'No results found' 
                : `Found ${results.length} ${results.length === 1 ? 'result' : 'results'}`}
            </h5>
          </div>
        )}

        <SearchResults results={results} loading={loading} />
      </Container>
    </div>
  );
}

export default App;

