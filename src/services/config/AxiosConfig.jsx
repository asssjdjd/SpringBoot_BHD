import axious from 'axios';
// import { refreshToken } from '../Api/AuthService';

const axiosClient = axious.create({
    baseURL: "http://localhost:8080/identity",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// axiosClient.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     console.error('Lỗi response interceptor:', err); // 🧪 In toàn bộ lỗi
//     const originalRequest = err.config;
//     // console.log(err.response?.status)
//     // err.response?.status === 401 &&
//     // console.log(err["status"])
//     //  console.log(!originalRequest._retry)
//     if (!originalRequest._retry) {
//        // Nếu không in => err.response là undefined
//       originalRequest._retry = true;
//       try {
//         console.log("yes");
//         const res = await refreshToken();
//         // console.log(res)
//         // console.log(res["data"]["response"]["token"])
//         localStorage.setItem("token",res["data"]["response"]["token"]) // nên thêm await nếu cần đợi token mới
//       } catch (e) {
//         console.log(e)
//         sessionStorage.clear();
//         localStorage.clear();
//         // window.location.href = '/login';
//       }
//     }

//     return Promise.reject(err);
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
