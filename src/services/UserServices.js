import axios from "axios";
import settings from "./config"

const apiClient = axios.create(settings);

export default {
  getUser() {
    return apiClient.get("/user");
  }
};