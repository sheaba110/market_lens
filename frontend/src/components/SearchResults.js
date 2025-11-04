import React from 'react';
import { Row, Col, Card, Badge, Spinner } from 'react-bootstrap';

const SearchResults = ({ results = [], loading = false }) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return null;
  }

  return (
    <Row>
      {results.map((offer, index) => (
        <Col key={offer.id || offer.url || `offer-${index}`} xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Card className="h-100 shadow-sm">
            {offer.image && (
              <Card.Img 
                variant="top" 
                src={offer.image} 
                alt={offer.title || 'Offer image'}
                style={{ 
                  height: '200px', 
                  objectFit: 'cover',
                  backgroundColor: '#f5f5f5'
                }}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="14" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                }}
              />
            )}
            <Card.Body className="d-flex flex-column">
              <Card.Title className="h6" style={{ minHeight: '48px' }}>
                {offer.title || 'Untitled Offer'}
              </Card.Title>
              
              {offer.snippet && (
                <Card.Text className="text-muted small flex-grow-1" style={{ fontSize: '0.85rem' }}>
                  {offer.snippet}
                </Card.Text>
              )}

              <div className="mt-auto pt-2">
                {offer.price && (
                  <div className="mb-2">
                    <Badge bg="success" className="fs-6">
                      {offer.currency || '$'}{typeof offer.price === 'number' ? offer.price.toLocaleString() : offer.price}
                    </Badge>
                  </div>
                )}

                {offer.source && (
                  <div className="mb-2">
                    <Badge bg="secondary" className="text-wrap">
                      {offer.source}
                    </Badge>
                  </div>
                )}

                {offer.url && (
                  <a 
                    href={offer.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm w-100"
                  >
                    View Offer
                  </a>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SearchResults;
