import axiosClient from "../config/AxiosConfig";

const theaterService = {
  getAll: () => axiosClient.get('/theater'),
  delete : (theaterID) => axiosClient.delete(`/theater/${theaterID}`)
};

export default theaterService;