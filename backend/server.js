const sequelize = require('./config/database');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5002;

// ייבוא המודלים
const Flight = require('./models/Flight');
const Booking = require('./models/Booking');

// פונקציה להוספת טיסות קבועות
async function initializeFlights() {
  const count = await Flight.count();
  if (count === 0) {
    await Flight.bulkCreate([
      { from: 'New York', to: 'Los Angeles', price: 350 },
      { from: 'Paris', to: 'London', price: 150 },
      { from: 'Tokyo', to: 'Seoul', price: 300 },
      { from: 'Sydney', to: 'Melbourne', price: 120 },
      { from: 'Rome', to: 'Berlin', price: 200 },
      { from: 'Toronto', to: 'Vancouver', price: 400 },
      { from: 'Dubai', to: 'Mumbai', price: 250 },
      { from: 'Cairo', to: 'Istanbul', price: 180 },
      { from: 'Mexico City', to: 'Cancun', price: 220 },
      { from: 'Miami', to: 'Chicago', price: 180 }
      // ניתן להוסיף טיסות נוספות לפי הצורך
    ]);
    console.log('Default flights added');
  }
}

// סנכרון מסד הנתונים והוספת טיסות ברירת מחדל
sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
  initializeFlights(); // הוספת טיסות לברירת מחדל
});

// נתיב ברירת מחדל
app.get('/', (req, res) => {
  res.send('Welcome to the Flight Booking API');
});

// נתיבי Flights

// חיפוש טיסות לפי עיר מוצא ועיר יעד
app.get('/flights/search', async (req, res) => {
  const { from, to } = req.query;
  
  try {
    const flights = await Flight.findAll({
      where: {
        ...(from && { from: from }), // אם יש from, תוסיף כקריטריון חיפוש
        ...(to && { to: to }) // אם יש to, תוסיף כקריטריון חיפוש
      }
    });
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search flights' });
  }
});

// קבלת טיסה לפי מזהה
app.get('/flights/:id', async (req, res) => {
  try {
    const flight = await Flight.findByPk(req.params.id);
    if (flight) {
      res.json(flight);
    } else {
      res.status(404).json({ error: 'Flight not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve flight' });
  }
});

// נתיבי Bookings

// קבלת כל ההזמנות
app.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve bookings' });
  }
});

// יצירת הזמנה חדשה
app.post('/bookings', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});


// קבלת הזמנה לפי מזהה
app.get('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve booking' });
  }
});

// האזנה לשרת
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
