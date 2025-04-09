// src/services/Api/CategoryService.js
import axiosClient from "../config/AxiosConfig";

const categoryService = {
  create: (data) => axiosClient.post('/category', data),
  getAll: () => axiosClient.get('/category'),
  delete : (categoryID) => axiosClient.delete(`/category/${categoryID}`)
};

export default categoryService;
