// axiosNoAuth.js
import axios from 'axios';

const axiosNoAuth = axios.create({
  baseURL: "http://localhost:8080/identity", // hoặc hardcode baseURL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosNoAuth;
