
import axiosClient from '../config/AxiosConfig';
import axiosNoAuth from '../config/AxiosNoAuth';


const authService = {
    login: (username, password) => axiosNoAuth.post('/auth/token', { username, password }),

    logout: () => axiosClient.post('/auth/logout'),

    refreshToken: () => axiosClient.post('/auth/refresh-token'),
    // get my infor
    getCurrentUser: () => {
        const token = localStorage.getItem('token');
        if (token) {
        return axiosClient.get('/auth/me', {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        }
        return null;
    },
};
export default authService;