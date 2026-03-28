import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// 🔐 Set token dynamically
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// 📧 POST - Analyze Email
export const analyzeEmail = (data) => API.post("/analyze", data);

// 📊 GET - Fetch incidents
export const getIncidents = () => API.get("/incidents");

export default API;