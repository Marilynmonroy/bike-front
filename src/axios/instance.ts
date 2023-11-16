import axios from "axios";

const bikeAPI = axios.create({
  baseURL: "http://localhost:3003/",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

export default bikeAPI;
