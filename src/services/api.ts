import { AppError } from "@/utils/app-error";
import axios from "axios";

const api = axios.create({
  baseURL: "http://172.19.0.1:3333",
  // headers: {
  //   "Accept": "application/json",
  //   "Content-Type": "application/json",
  // },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    }

    return Promise.reject(error);
  }
);

export { api };
