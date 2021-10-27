import axios from "axios";
import settings from "./config"

const apiClient = axios.create(settings);

export default {
  getStudents() {
    return apiClient.get("/students/");
  },

  getStudent(studentID) {
    return apiClient.get("/students/" + studentID);
  },
  deleteStudent(studentID) {
    return apiClient.delete("/students/" + studentID);
  },
  addStudent(student) {
    return apiClient.post("/students/", student);
  },
  updateStudent(studentID, student) {
    return apiClient.put("/students/" + studentID, student);
  }
};