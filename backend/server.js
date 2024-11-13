const sequelize = require('./config/database');

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const express = require('express');
const cors = require('cors'); // הוספת CORS
const app = express();

app.use(cors()); // שימוש ב-CORS
app.use(express.json());

const PORT = 5001;

// נתיב ברירת מחדל
app.get('/', (req, res) => {
  res.send('Welcome to the Flight Booking API');
});

// ייבוא המודלים
const Flight = require('./models/Flight');
const Booking = require('./models/Booking');

// סנכרון מסד הנתונים
sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

// נתיבי Flights

// קבלת כל הטיסות
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


// יצירת טיסה חדשה
app.post('/flights', async (req, res) => {
  console.log('Request Body:', req.body); // הדפסת גוף הבקשה
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json(flight);
  } catch (error) {
    console.error('Error creating flight:', error);
    res.status(500).json({ error: 'Failed to create flight', details: error.message });
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

// עדכון טיסה לפי מזהה
app.put('/flights/:id', async (req, res) => {
  try {
    const flight = await Flight.findByPk(req.params.id);
    if (flight) {
      await flight.update(req.body);
      res.json(flight);
    } else {
      res.status(404).json({ error: 'Flight not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update flight' });
  }
});

// מחיקת טיסה לפי מזהה
app.delete('/flights/:id', async (req, res) => {
  try {
    const flight = await Flight.findByPk(req.params.id);
    if (flight) {
      await flight.destroy();
      res.json({ message: 'Flight deleted' });
    } else {
      res.status(404).json({ error: 'Flight not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete flight' });
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

// עדכון הזמנה לפי מזהה
app.put('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (booking) {
      await booking.update(req.body);
      res.json(booking);
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// מחיקת הזמנה לפי מזהה
app.delete('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (booking) {
      await booking.destroy();
      res.json({ message: 'Booking deleted' });
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

// האזנה לשרת
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
