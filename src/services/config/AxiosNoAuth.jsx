// axiosNoAuth.js
import axios from 'axios';

const axiosNoAuth = axios.create({
  baseURL: "http://localhost:8080/identity", // hoặc hardcode baseURL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// axiosNoAuth.interceptors.response.use(
//   (response) => {
//     if (response.status >= 200 && response.status < 300) {
//       return response.data?.data || response.data;
//     } else {
//       throw new Error(response.data?.message || 'Unexpected error');
//     }
//   },
//   (error) => {
//     Promise.reject(error)
//   }
// );

export default axiosNoAuth;
