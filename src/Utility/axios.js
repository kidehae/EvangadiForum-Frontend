import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:2112", // will be Updated later after backend deploy
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosInstance };
