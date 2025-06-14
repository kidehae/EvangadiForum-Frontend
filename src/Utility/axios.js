import axios from "axios";


export const axiosInstance = axios.create({
  baseURL: "http://localhost:2112",

  headers: {
    "Content-Type": "application/json",
  },
});

// It only injects the token into the headers of outgoing requests if the token exists in localStorage.
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
