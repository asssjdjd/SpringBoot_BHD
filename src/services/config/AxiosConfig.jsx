import axious from 'axios';


const axiosClient = axious.create({
    baseURL: "http://localhost:8080/identity",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// axiosClient.interceptors.response.use(
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


axiosClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );



export default axiosClient;
