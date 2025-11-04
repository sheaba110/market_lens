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
        params: { query: query.trim() }
      });
      
      setResults(response.data.results || []);
    } catch (err) {
      setError(
        err.response?.data?.detail || 
        err.message || 
        'Failed to search. Please check if the backend server is running.'
      );
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

