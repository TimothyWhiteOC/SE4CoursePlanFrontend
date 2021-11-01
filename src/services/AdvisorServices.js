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