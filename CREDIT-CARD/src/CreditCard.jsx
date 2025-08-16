import React from 'react';
import './CreditCard.css';

const CreditCard = ({ cardNumber, cardHolder, expiryMonth, expiryYear, cvv, isFlipped }) => {
  return (
    <div className={`credit-card ${isFlipped ? 'flipped' : ''}`}>
      <div className="credit-card-inner">
        <div className="credit-card-front">
          <div className="logo"></div>
          <div className="card-number">{cardNumber || '•••• •••• •••• ••••'}</div>
          <div className="card-details">
            <div className="card-holder-name">
              <div className="label">Card Holder</div>
              <div className="value">{cardHolder || 'FULL NAME'}</div>
            </div>
            <div className="card-expiry">
              <div className="label">Expires</div>
              <div className="value">{expiryMonth || '••'}/{expiryYear || '••'}</div>
            </div>
          </div>
        </div>
        <div className="credit-card-back">
          <div className="magnetic-strip"></div>
          <div className="cvv-section">
            <div className="label">CVV</div>
            <div className="cvv-value">{cvv || '•••'}</div>
          </div>
          <div className="signature"></div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;

