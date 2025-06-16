import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://evangadiforum-backend-5.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("authToken");
      window.location.href = "/signIn";
    }
    return Promise.reject(error);
  }
);

// Question API
export const questionsAPI = {
  getAllQuestions: () => axiosInstance.get("/api/question"),
  getQuestionById: (id) => axiosInstance.get(`/api/question/${id}`),
};

// Answer API
export const answersAPI = {
  getAnswersByQuestionId: (questionId) =>
    axiosInstance.get(`/api/answer/${questionId}`),
  postAnswer: (answerData) => axiosInstance.post("/api/answer", answerData),
};

export default axiosInstance;
