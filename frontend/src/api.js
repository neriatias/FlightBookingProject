import axios from 'axios';

const api = axios.create({
  baseURL: 'https://flight-backend-efms.onrender.com', // הכתובת של ה-Backend שלך
});

export default api;
