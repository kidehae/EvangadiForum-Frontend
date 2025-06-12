import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:2112", // Update this when deploying backend
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // adjust if you store it somewhere else
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { axiosInstance };

// === QUESTIONS API ===
export const getAllQuestions = () => {
  return axiosInstance.get("/api/question");
};

export const getQuestionById = (id) => {
  return axiosInstance.get(`/api/question/${id}`);
};
