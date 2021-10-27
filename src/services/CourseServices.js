import axios from "axios";
import settings from "./config"

const apiClient = axios.create(settings);

export default {
  getCourses() {
    return apiClient.get("/courses/");
  },
  getCourse(courseNo) {
    return apiClient.get("/courses/" + courseNo);
  },
  deleteCourse(courseNo) {
    return apiClient.delete("/courses/" + courseNo);
  },
  addCourse(course) {
    console.log(course);
    return apiClient.post("/courses/", course);
  },
  updateCourse(courseNo, course) {
    return apiClient.put("/courses/" + courseNo, course);
  }

};