import React, { useState } from "react";
import validator from "validator";
import CreditCard from "./CreditCard";
import "./App.css";

const App = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [flag, setFlag] = useState(false);
  const [credit, setCredit] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  const validateCreditCard = (value) => {
    if (validator.isCreditCard(value)) {
      setErrorMessage(" Valid Credit Card Number");
      setFlag(true);
    } else if (value === "") {
      setErrorMessage("");
    } else {
      setErrorMessage(" Enter a valid Credit Card Number!");
      setFlag(false);
    }
  };

  return (
    <div className="app-container">
      <CreditCard
        cardNumber={credit}
        cardHolder={cardHolder}
        expiryMonth={expiryMonth}
        expiryYear={expiryYear}
        cvv={cvv}
        isFlipped={isFlipped}
      />
      <div className="form-container">
        <h2>Credit Card Validator</h2>

        <div className="form-group">
          <label>Card Number:</label>
          <input
            type="text"
            value={credit}
            onChange={(e) => {
              const newValue = e.target.value;
              setCredit(newValue);
              validateCreditCard(newValue);
            }}
            onFocus={() => setIsFlipped(false)}
            placeholder="•••• •••• •••• ••••"
          />
          <div className={`message ${flag ? "success" : "error"}`}>
            {errorMessage}
          </div>
        </div>

        <div className="form-group">
          <label>Card Holder:</label>
          <input
            type="text"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
            onFocus={() => setIsFlipped(false)}
            placeholder="FULL NAME"
          />
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label>Expiry Month:</label>
            <input
              type="text"
              value={expiryMonth}
              onChange={(e) => setExpiryMonth(e.target.value)}
              onFocus={() => setIsFlipped(false)}
              placeholder="MM"
              maxLength="2"
            />
          </div>
          <div className="form-group half-width">
            <label>Expiry Year:</label>
            <input
              type="text"
              value={expiryYear}
              onChange={(e) => setExpiryYear(e.target.value)}
              onFocus={() => setIsFlipped(false)}
              placeholder="YY"
              maxLength="2"
            />
          </div>
        </div>

        <div className="form-group">
          <label>CVV:</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            onFocus={() => setIsFlipped(true)}
            onBlur={() => setIsFlipped(false)}
            placeholder="•••"
            maxLength="4"
          />
        </div>
      </div>
    </div>
  );
};

export default App;


