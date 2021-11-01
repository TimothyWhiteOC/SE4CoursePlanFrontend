import axios from "axios";
import settings from "./config"

const apiClient = axios.create(settings);

// it is possible not every method will be used
export default {
  getSemesters() {
    return apiClient.get("/semesters/");
  },

  getSemester(year, term) {
    return apiClient.get("/semesters/" + studentID);
  },
  deleteSemester(year, term) {
    return apiClient.delete("/students/" + studentID);
  },
  addSemester(semester) {
    return apiClient.post("/students/", semester);
  },
  updateSemester(year, term, semester) {
    return apiClient.put("/students/" + studentID, semester);
  }
};