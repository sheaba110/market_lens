import React, { useState } from 'react'
import './OfferCard.css'

export default function OfferCard({ offer, index }) {
  const [imgError, setImgError] = useState(false)

  return (
    <article
      className="offer-card"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image */}
      <div className="offer-card-image-wrap">
        {offer.image && !imgError ? (
          <img
            className="offer-card-image"
            src={offer.image}
            alt={offer.title || 'Offer image'}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="offer-card-image-placeholder" aria-hidden="true">
            🖥️
          </div>
        )}
      </div>

      {/* Body */}
      <div className="offer-card-body">
        <h3 className="offer-card-title">
          {offer.title || 'Untitled Offer'}
        </h3>

        {offer.snippet && (
          <p className="offer-card-snippet">{offer.snippet}</p>
        )}

        <div className="offer-card-meta">
          <div className="offer-card-meta-row">
            {offer.price != null && (
              <span className="offer-card-price">
                {offer.currency || 'EGP'}{' '}
                {typeof offer.price === 'number'
                  ? offer.price.toLocaleString()
                  : offer.price}
              </span>
            )}
            {(offer.source || offer.vendor) && (
              <span className="offer-card-vendor">
                {offer.source || offer.vendor}
              </span>
            )}
          </div>

          {offer.url && (
            <a
              href={offer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="offer-card-link"
            >
              View Offer
              <span className="offer-card-link-arrow">→</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
