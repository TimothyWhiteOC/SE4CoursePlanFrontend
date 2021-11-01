import axios from "axios";
import settings from "./config"

const apiClient = axios.create(settings);

export default {
  getMajorCourses(majorID) {
    return apiClient.get("/degrees/" + majorID + "/courses/");
  },
  deleteMajorCourse(majorID, courseNo) {
    return apiClient.delete("/degrees/" + majorID + "/courses/" + courseNo);
  },
  addMajorCourse(majorID, majorCourse) {
    return apiClient.post("/degrees/" + majorID + "/courses/", majorCourse);
  }
};