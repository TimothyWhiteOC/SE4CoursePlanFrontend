import axios from "axios";

var baseurl = "";
if (process.env.NODE_ENV === "development") {
  baseurl = "http://localhost:8081";
} else {
  baseurl = "http://team2.eaglesoftwareteam.com:8081/";
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