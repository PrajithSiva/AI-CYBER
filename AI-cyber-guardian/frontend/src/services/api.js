import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
});

// POST - Insert incident
export const analyzeEmail = (data) => API.post("/analyze", data);

// GET - Fetch all incidents
export const getIncidents = () => API.get("/incidents");