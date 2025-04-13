import axiosClient from "../config/AxiosConfig";

const filmService = {
  getAll: () => axiosClient.get('/films'),
  delete : (filmID) => axiosClient.delete(`/films/${filmID}`),
  getOneFilm: (filmId) => axiosClient.get(`/films/${filmId}`)
};

export default filmService;
