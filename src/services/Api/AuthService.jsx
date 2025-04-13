
import axiosClient from '../config/AxiosConfig';
import axiosNoAuth from '../config/AxiosNoAuth';


const authService = {
    login: (username, password) => axiosNoAuth.post('/auth/token', { username, password }),

    logout: () => axiosClient.post('/auth/logout'),

    
    
};
export default authService;
export const refreshToken = () => {
    const oldToken = localStorage.getItem('token');
    console.log(oldToken)
    const token = {"token" : oldToken}
    console.log(token)
    return axiosNoAuth.post('auth/refresh',token)
    // .then(res => {
    // //   const newToken = res.data.token; 
    // console.log(res)
    // //   localStorage.setItem('token', newToken);
    // //   return newToken;
    // });
  };