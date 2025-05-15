import axios from "axios";

const axiosMeetingDB = axios.create({
  baseURL: "https://nnbook-production.up.railway.app/api/meeting",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosMeetingDB;
