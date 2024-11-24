const request = require('supertest');
const app = require('../server'); // נתיב לשרת
const Flight = require('../models/Flight'); // מודל ה-Flight
const sequelize = require('../config/database'); // חיבור למסד הנתונים

let server; // משתנה לשמירת השרת
let PORT; // משתנה לפורט דינמי

describe('Flight Booking API Tests', () => {
  beforeAll(async () => {
    server = app.listen(0); // הפעלת השרת על פורט דינמי
    PORT = server.address().port; // שמירת הפורט בפועל
    await sequelize.sync({ force: false }); // סנכרון מסד הנתונים
  });

  afterAll(async () => {
    if (server) {
      server.close(); // סגירת השרת
    }
    await sequelize.close(); // סגירת החיבור למסד הנתונים
  });

  test('Server loads successfully', () => {
    expect(app).toBeDefined();
  });

  describe('GET /flights/search', () => {
    it('should return a list of flights matching search criteria', async () => {
      const response = await request(`http://localhost:${PORT}`).get('/flights/search?from=New York&to=Los Angeles');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should return an empty array if no flights match', async () => {
      const response = await request(`http://localhost:${PORT}`).get('/flights/search?from=InvalidCity&to=InvalidCity');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('Database initialization', () => {
    it('should contain default flights', async () => {
      const flights = await Flight.findAll();
      expect(flights.length).toBeGreaterThan(0);
    });
  });

  test('Sample test to ensure Jest works', () => {
    expect(1 + 1).toBe(2);
  });
});
