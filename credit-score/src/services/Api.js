import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Update if backend URL is different

// Configure Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token if needed
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Register a Business
export const registerBusiness = async (businessData, token) => {
  setAuthToken(token);
  return api.post("/businesses/", businessData);
};

// Upload Business Document (CSV/PDF)
export const uploadBusinessDocument = async (businessId, file, token) => {
  setAuthToken(token);
  const formData = new FormData();
  formData.append("document", file);
  
  return api.post(`/business/${businessId}/upload-document/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Predict Credit Score
export const predictCreditScore = async (formData, token) => {
  setAuthToken(token);
  return api.post("/predict-credit-score/", formData);
};
