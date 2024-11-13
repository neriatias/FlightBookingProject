// Flights.js
import React, { useState, useEffect } from 'react';
import api from '../api';
import './Flights.css';

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [newFlight, setNewFlight] = useState({ from: '', to: '', price: '' });
  const [message, setMessage] = useState(''); // הודעה עבור המשתמש
  const [searchQuery, setSearchQuery] = useState(''); // שדה חיפוש

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await api.get('/flights');
      setFlights(response.data);
    } catch (error) {
      console.error('Failed to fetch flights:', error);
    }
  };

  const createFlight = async () => {
    try {
      await api.post('/flights', newFlight);
      fetchFlights(); // רענון הרשימה
      setNewFlight({ from: '', to: '', price: '' });
      setMessage('Flight added successfully!'); // הצגת הודעת הצלחה
      setTimeout(() => setMessage(''), 3000); // הסתרת ההודעה לאחר 3 שניות
    } catch (error) {
      console.error('Failed to create flight:', error);
      setMessage('Failed to add flight. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // פונקציה לסינון טיסות לפי חיפוש
  const filteredFlights = flights.filter((flight) => 
    flight.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.to.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flights-container">
      <h1>Available Flights</h1>

      {message && <div className="message">{message}</div>} {/* הצגת הודעת הצלחה */}

      {/* שדה חיפוש */}
      <input
        type="text"
        placeholder="Search flights"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <div className="flights-grid">
        {filteredFlights.map((flight) => (
          <div key={flight.id} className="flight-card">
            <h2>{flight.from} to {flight.to}</h2>
            <p><strong>Price:</strong> ${flight.price}</p>
          </div>
        ))}
      </div>

      <h2>Create New Flight</h2>
      <div className="new-flight-form">
        <input
          type="text"
          placeholder="From"
          value={newFlight.from}
          onChange={(e) => setNewFlight({ ...newFlight, from: e.target.value })}
        />
        <input
          type="text"
          placeholder="To"
          value={newFlight.to}
          onChange={(e) => setNewFlight({ ...newFlight, to: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newFlight.price}
          onChange={(e) => setNewFlight({ ...newFlight, price: e.target.value })}
        />
        <button onClick={createFlight}>Add Flight</button>
      </div>
    </div>
  );
};

export default Flights;
