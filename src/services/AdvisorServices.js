import axios from "axios";
import settings from "./config"

const apiClient = axios.create(settings);

export default {
  getAdvisors() {
    return apiClient.get("/advisors/");
  },

  getAdvisor(advisorID) {
    return apiClient.get("/advisors/" + advisorID);
  },
  deleteAdvisor(advisorID) {
    return apiClient.delete("/advisors/" + advisorID);
  },
  addAdvisor(advisor) {
    return apiClient.post("/advisors/", advisor);
  },
  updateAdvisor(advisorID, advisor) {
    return apiClient.put("/advisors/" + advisorID, advisor);
  }
};