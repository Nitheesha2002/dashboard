import axios from "axios";

export const getMetrics = () => {
  return axios.get("http://localhost:8000/metrics");
};