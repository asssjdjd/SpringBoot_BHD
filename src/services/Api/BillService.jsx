import axiosClient from "../config/AxiosConfig";

const billService = {
  getAll: () => axiosClient.get('/bill'),
  create: (data) =>axiosClient.post('/bill',data)
};

export default billService;
