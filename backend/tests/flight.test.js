const request = require('supertest');
const app = require('../server');
const sequelize = require('../config/database');

let server;
let PORT;

describe('Flight Booking API Tests', () => {
  beforeAll(async () => {
    server = app.listen(0); // הפעלת השרת על פורט דינמי
    PORT = server.address().port;

    // חיבור למסד הנתונים עם לולאת בדיקה
    let connected = false;
    for (let i = 0; i < 10; i++) {
      try {
        await sequelize.authenticate(); // בדוק אם החיבור פעיל
        await sequelize.sync({ force: false }); // סנכרון מסד הנתונים
        connected = true;
        break;
      } catch (error) {
        console.log(`Database connection failed, retrying (${i + 1}/10)...`);
        await new Promise((resolve) => setTimeout(resolve, 5000)); // המתן 5 שניות
      }
    }
    if (!connected) throw new Error('Failed to connect to the database');
  });

  afterAll(async () => {
    if (server) server.close(); // סגור את השרת
    await sequelize.close(); // סגור את החיבור למסד הנתונים
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
      const flights = await sequelize.models.Flight.findAll();
      expect(flights.length).toBeGreaterThan(0);
    });
  });

  test('Sample test to ensure Jest works', () => {
    expect(1 + 1).toBe(2);
  });
});
