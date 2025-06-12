import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://date.nager.at/api/v3",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
