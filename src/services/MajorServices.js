import axios from "axios";
import settings from "./config"

const apiClient = axios.create(settings);

export default {
  getMajors() {
    return apiClient.get("/degrees/");
  },

  getMajor(majorID) {
    return apiClient.get("/degrees/" + majorID);
  },
  deleteMajor(majorID) {
    return apiClient.delete("/degrees/" + majorID);
  },
  addMajor(major) {
    return apiClient.post("/degrees/", major);
  },
  updateMajor(majorID, major) {
    return apiClient.put("/degrees/" + majorID, major);
  }
};