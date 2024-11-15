import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5002', // הכתובת של ה-Backend שלך
});

export default api;
