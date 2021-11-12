import axios from "axios";
import settings from "./config"

const apiClient = axios.create(settings);

export default {
  getStudentCourses(studentID) {
    return apiClient.get("/students/" + studentID + "/courses");
  },
  getStudentCourse(studentID, courseNo) {
    return apiClient.get("/students/" + studentID + "/courses/" + courseNo);
  },
  deleteStudentCourse(studentID, courseNo) {
    return apiClient.delete("/students/" + studentID + "/courses/" + courseNo);
  },
  addStudentCourse(studentID, sCourse) {
    return apiClient.post("/students/" + studentID + "/courses", sCourse);
  },
  updateStudentCourse(studentID, courseNo, sCourse) {
    return apiClient.put("/students/" + studentID + "/courses/" + courseNo, sCourse);
  }

  //add a scourse object 
};