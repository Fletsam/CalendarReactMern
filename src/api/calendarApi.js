import axios from "axios";

const calendarApi = axios.create({
  baseURL: "https://comfy-monstera-9b3753.netlify.app/auth/login",
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
