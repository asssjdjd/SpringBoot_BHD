
import axiosClient from '../config/AxiosConfig';
import axiosNoAuth from '../config/AxiosNoAuth';

const userAPI = {
  getAll: () => axiosClient.get('/users'),
  getById: (id) => axiosClient.get(`/users/${id}`),
  update: (id, data) => axiosClient.put(`/users/${id}`, data),
  delete: (id) => axiosClient.delete(`/users/${id}`),
  create: (data) => axiosNoAuth.post('/users',data),   
};

export default userAPI;