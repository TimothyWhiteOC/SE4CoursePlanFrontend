<template>
  <div>
    <h2>Degree Audit</h2>   
    <br>

   <!-- <button v-on:click= "cancel">Cancel</button>-->

  <degree-audit-course v-for="mCourse in majorCourses" :key="mCourse.courseNo" :course="mCourse" /> 

  </div>
</template>


<script>

import StudentCourseServices from '@/services/StudentCourseServices.js';
import MajorCourseServices from '@/services/MajorCourseServices.js';
import StudentServices from '@/services/StudentServices.js';
import DegreeAuditCourse from '../components/DegreeAuditCourse.vue';
export default {
  components: { CourseDisplay },
  props: ['studentID'],
  data() {
    return {
      studentCourses: [],
      studentMajorID: null,
      majorCourses: []
    };
  },
  created() {
    StudentServices.getStudent(studentID)
      .then(response => {
        this.studentMajorID = response.data.majorID;
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
    StudentCourseServices.getStudentCourses(studentID)
      .then(response => {
        this.studentCourses = response.data
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })

    MajorCourseServices.getMajorCourses(studentMajorID)
      .then(response => {
        this.majorCourses = response.data
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
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
</script>

<!--import jspdf and autotable here if imports fail 
  <script src="jspdf.plugin.autotable.min.js"></script>
-->