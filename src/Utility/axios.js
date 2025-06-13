import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:2112",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token to every request if it exists
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Question API 
export const questionsAPI = {
  getAllQuestions: () => axiosInstance.get("/api/question"),
  getQuestionById: (id) => axiosInstance.get(`/api/question/${id}`),
  postQuestion: (data) => axiosInstance.post("/api/question", data),
};

// Answer API
export const answersAPI = {
  getAnswersByQuestionId: (questionId) =>
    axiosInstance.get(`/api/answers/${questionId}`),
  postAnswer: (answerData) => axiosInstance.post("/api/answer", answerData),
};
