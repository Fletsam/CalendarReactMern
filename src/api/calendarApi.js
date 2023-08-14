import axios from "axios";
import { getEnvVariables } from "../helpers";

const calendarApi = axios.create({
  baseURL: "http://localhost:4000/api",
});

//todo : configurar interceptores

calendarApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };
  return config;
});

export default calendarApi;
