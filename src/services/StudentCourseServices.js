import axios from "axios";

var baseurl = "";
if (process.env.NODE_ENV === "development") {
  baseurl = "http://localhost:8081";
} else {
  baseurl = "http://team2.eaglesoftwareteam.com:8081";
}

const apiClient = axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    crossDomain: true
  },
  transformRequest: (data, headers) => {
    let token = localStorage.getItem("token");
    let authHeader = "";
    if (token != null && token != "") authHeader = "Bearer " + token;
    headers.common["Authorization"] = authHeader;
    return JSON.stringify(data);
  },
  transformResponse: function(data) {
    data = JSON.parse(data);
    if (!data.success && data.code == "expired-session") {
      localStorage.deleteItem("token");
    }
    return data;
  }
});

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
    return apiClient.post("/students/" + studentID + "/courses/", sCourse);
  },
  updateStudentCourse(studentID, courseNo, sCourse) {
    return apiClient.put("/students/" + studentID + "/courses/", sCourse);
  }
};