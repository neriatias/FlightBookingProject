import React, { useState, useEffect } from 'react';
import api from '../api';
import './Flights.css';
//test

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // שדה חיפוש
  const [selectedFlight, setSelectedFlight] = useState(null); // טיסה שנבחרה להזמנה
  const [passengerName, setPassengerName] = useState(''); // שם הנוסע
  const [seatNumber, setSeatNumber] = useState(''); // מספר המושב
  const [message, setMessage] = useState(''); // הודעה לאחר הזמנה

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await api.get('/flights/search');
      console.log(response); // הדפסת המידע לצורכי Debugging
      setFlights(response.data); // עדכון מצב הטיסות
    } catch (error) {
      console.error('Failed to fetch flights:', error);
    }
  };
  
  // פונקציה לסינון טיסות לפי חיפוש
  const filteredFlights = flights.filter((flight) =>
    flight.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.to.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // פתיחת טופס הזמנה
  const openBookingForm = (flight) => {
    setSelectedFlight(flight);
    setPassengerName('');
    setSeatNumber('');
    setMessage('');
  };

  // שליחת ההזמנה
  const handleBooking = async () => {
    try {
      const response = await api.post('/bookings', {
        flightId: selectedFlight.id,
        passengerName,
        seatNumber
      });
      console.log(response); // הדפסת התגובה לצורכי Debugging
      setMessage(`Booking confirmed for ${passengerName} on flight from ${selectedFlight.from} to ${selectedFlight.to}`);
      setSelectedFlight(null); // סגירת הטופס לאחר שליחה
    } catch (error) {
      console.error('Failed to create booking:', error);
      setMessage('Failed to create booking. Please try again.');
    }
  };

  return (
    <div className="flights-container">
      <h1>Available Flights</h1>

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
            <button onClick={() => openBookingForm(flight)}>Book Now</button> {/* כפתור הזמנה */}
          </div>
        ))}
      </div>

      {/* טופס הזמנה */}
      {selectedFlight && (
        <div className="booking-form">
          <h2>Book Flight from {selectedFlight.from} to {selectedFlight.to}</h2>
          <input
            type="text"
            placeholder="Passenger Name"
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Seat Number"
            value={seatNumber}
            onChange={(e) => setSeatNumber(e.target.value)}
          />
          <button onClick={handleBooking}>Confirm Booking</button>
          <button onClick={() => setSelectedFlight(null)}>Cancel</button>
        </div>
      )}

      {/* הודעה על ההזמנה */}
      {message && <p className="booking-message">{message}</p>}
    </div>
  );
};

export default Flights;
