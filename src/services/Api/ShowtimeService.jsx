import axiosClient from "../config/AxiosConfig";

const showtimeService = {
  create: (data) => axiosClient.post('/showtime', data),
  getAll: () => axiosClient.get('/showtime'),
  delete : (showtimeId) => axiosClient.delete(`/showtime/${showtimeId}`)
};

export default showtimeService;
