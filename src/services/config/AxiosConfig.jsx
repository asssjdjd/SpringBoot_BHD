import axious from 'axios';

const axiosClient = axious.create({
    baseURL: "http://localhost:8080/identity",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});


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
