import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants";


const axiosService = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosService.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const { response } = error;
    const status = response?.status;
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN)
    if (token && (status === 401 || status === 403)) {
      localStorage.clear();
      window.location.reload()
    }

    return Promise.reject(error);
  })

export {
  axiosService
};
