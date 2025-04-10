import axiosClient from "../config/AxiosConfig";

const foodComboService = {
  getAll: () => axiosClient.get('/foods'),
  delete : (foodId) => axiosClient.delete(`/foods/${foodId}`)
};

export default foodComboService;