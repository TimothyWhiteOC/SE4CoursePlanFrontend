<template>
  <div>
    <h2>Degree Audit</h2>   
    <br>

   <!-- <button v-on:click= "cancel">Cancel</button>-->

  <degree-audit-course v-for="course in auditCourses" :key="course.majorCourse.courseNo" :auditCourse="course"/> 

  </div>
</template>


<script>

import StudentCourseServices from '@/services/StudentCourseServices.js';
import MajorCourseServices from '@/services/MajorCourseServices.js';
import StudentServices from '@/services/StudentServices.js';
import DegreeAuditCourse from '../components/DegreeAuditCourse.vue';
export default {
  components: { DegreeAuditCourse },
  props: ['studentID'],
  data() {
    return {
      // https://stackoverflow.com/questions/58721689/how-to-v-model-for-array-of-objects
      semesters: [],
      currCourseNo: string
    };
  },
  created() {
    var studentCourses = {};
    var currCourse = {};
    var studentMajorID;
    var majorCourses = {};
    var semester = {};

    StudentServices.getStudent(studentID)
      .then(response => {
        studentMajorID = response.data.majorID;
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
    StudentCourseServices.getStudentCourses(studentID)
      .then(response => {
        studentCourses = response.data
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })

    MajorCourseServices.getMajorCourses(studentMajorID)
      .then(response => {
        majorCourses = response.data
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
    // https://www.freecodecamp.org/news/javascript-array-of-objects-tutorial-how-to-create-update-and-loop-through-objects-using-js-array-methods/
    // https://www.w3docs.com/snippets/javascript/how-to-append-an-item-to-an-array-in-javascript.html
    for (sCourse in studentCourses) {
      currentCourseNo = sCourse.courseNo;


      // sCourse = {};
      // https://www.w3schools.com/jsref/jsref_find.asp
      // sCourse = studentCourses.find(getCreditedCourse);
      // https://www.w3docs.com/snippets/javascript/how-to-remove-an-element-from-an-array-in-javascript.html
      this.semesters.push(
        {
          term = sCourse.term,
          year = sCourse.year,
          gpa = "",
          totalHours = 0,
          courses  = {}
        }
      );
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'menu' });
    },
    // may need to install jspdf, autotable
    // https://stackoverflow.com/questions/54069884/installing-jspdf-using-npm-command
    // https://cnpmjs.org/package/jspdf-autotable
    // or may need to import
    // i used the tutorial code here because its code works
    // https://codingshiksha.com/vue/vue-js-pdf-generator-in-vuetify-ui-using-jspdf-and-jspdf-autotable-library-full-tutorial-for-beginners/
    makePDF() {
      const columns = [
        { title: "Title", dataKey: "title" },
        { title: "Body", dataKey: "body" }
      ];
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "letter"
      });
      // text is placed using x, y coordinates
      doc.setFontSize(16).text(this.heading, 0.5, 1.0);
      // create a line under heading 
      doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
      // Using autoTable plugin
      doc.autoTable({
        columns,
        body: this.items,
        margin: { left: 0.5, top: 1.25 }
      });
      // Using array of sentences
      doc
        .setFont("helvetica")
        .setFontSize(12)
        .text(this.moreText, 0.5, 3.5, { align: "left", maxWidth: "7.5" });
      
      // Creating footer and saving file
      doc
        .setFont("times")
        .setFontSize(11)
        .setFontStyle("italic")
        .setTextColor(0, 0, 255)
        .text(
          "This is a simple footer located .5 inches from page bottom",
          0.5,
          doc.internal.pageSize.height - 0.5
        )
        .save(`${this.heading}.pdf`);
    }
  }
}

function  getCreditedCourse(courseNo) {
  return courseNo == this.currentCourseNo;
}

function  getSemesterExists(courseNo) {
  return courseNo == this.currentCourseNo;
}
</script>

<!--import jspdf and autotable here if imports fail 
  <script src="jspdf.plugin.autotable.min.js"></script>
-->