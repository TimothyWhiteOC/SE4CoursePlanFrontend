<template>
  <div>
    <h2>Course Plan</h2>
    <h3>Total Hours: {{totalHours}}   Total major Credit: {{totalMajorHours}}</h3>
    <br>
    <cor-plan-semester-display v-for="semester in semesters" :key="semester.semTerm" :semester="semester"/>

    <!-- <button v-on:click= "cancel">Cancel</button>-->

  <!--<degree-audit-course v-for="course in auditCourses" :key="course.majorCourse.courseNo" :auditCourse="course"/> -->

  </div>
</template>


<script>

import StudentCourseServices from '@/services/StudentCourseServices.js';
import MajorCourseServices from '@/services/MajorCourseServices.js';
import StudentServices from '@/services/StudentServices.js';
import CourseServices from '@/services/CourseServices.js';

import CorPlanSemesterDisplay from '../components/CorPlanSemesterDisplay.vue';

export default {
  components: { CorPlanSemesterDisplay },
  props: ['studentID'],
  data() {
    return {
      // https://stackoverflow.com/questions/58721689/how-to-v-model-for-array-of-objects
      // https://www.delftstack.com/howto/javascript/javascript-declare-empty-array/
      semesters: [],
      totalHours: 0,
      totalMajorHours: 0
    };
  },
  created() {
    var studentCourses = {};
    var studentMajorID;
    var semesterChrono = {};
    var semester = {};
    var majorCourses = {};
    var curCourse = {};


    StudentServices.getStudent(this.studentID)
      .then(response => {
        studentMajorID = response.data.majorID;
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
    StudentCourseServices.getStudentCourses(this.studentID)
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
    // https://www.w3schools.com/js/js_objects.asp
    // https://eslint.org/docs/rules/no-undef

    // https://www.delftstack.com/howto/javascript/javascript-declare-empty-array/
    for (var sCourse in studentCourses) {
      semesterChrono = {
        year: sCourse.semYear,
        term: sCourse.semTerm
      };
      semester = this.semesters.find(getSemesterExists, semesterChrono);
      if (!semester) {
        semester = {
          semTerm: sCourse.semTerm,
          semYear: sCourse.semYear,
          semStartDate: {},
          GPA: 0,
          semHours: 0,
          semMajorHours: 0,
          courses: []
        };
        this.semesters.push(semester);
      }

      CourseServices.getCourse(sCourse.courseNo)
      .then(response => {
        curCourse =  response.data
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
      
      semester.courses.push(
        {
          // load all the necessarydata here from sCourse and currCourse
          dept: curCourse.dept,
          courseNo: sCourse.courseNo,
          desc: curCourse.description,
          grade: sCourse.grade
        }
      );
      semester.semHours += curCourse.hours;
      this.totalHours += curCourse.hours;
      if (majorCourses.find(getCreditedCourse, sCourse)) {
        semester.semMajorHours += curCourse.hours;
        this.totalMajorHours += curCourse.hours;
      }
    }

    /*
    // add the sort later
     semesters.sort(function(a, b) 
      {
        if a.

        return 0;
      }
    );

    // calculate all necessary values;
    gpa
    */
   
    
    /*
    // so, this was old
    
    for (sCourse in studentCourses) {
      currentCourseNo = sCourse.courseNo;
      // sort, then iterate through, change semester when new semester
      // iterate through, get all semester
      // filter

      // sCourse = {};
      // https://www.w3schools.com/jsref/jsref_find.asp
      // sCourse = studentCourses.find(getCreditedCourse);
      // https://www.w3docs.com/snippets/javascript/how-to-remove-an-element-from-an-array-in-javascript.html
      semester = {};
      semester = semesters.find(getSemesterExists);
      if ()
      this.semesters.push(
        {
          term = sCourse.term,
          year = sCourse.year,
          gpa = "",
          totalHours = 0,
          courses  = {}
        }
      );
    } */
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'menu' });
    }
    // may need to install jspdf, autotable
    // https://stackoverflow.com/questions/54069884/installing-jspdf-using-npm-command
    // https://cnpmjs.org/package/jspdf-autotable
    // or may need to import
    // i used the tutorial code here because its code works
    // https://codingshiksha.com/vue/vue-js-pdf-generator-in-vuetify-ui-using-jspdf-and-jspdf-autotable-library-full-tutorial-for-beginners/
    /*makePDF() {
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
    }*/
  }
}

function getCreditedCourse(courseNo) {
  return courseNo == this.currentCourseNo;
}

function getSemesterExists(semester) {
  return (semester.semTerm === this.term && semester.year === this.semYear);
}

// https://www.w3schools.com/jsref/jsref_sort.asp
/*function a(courseNo) {
  return courseNo == this.currentCourseNo;
}*/
</script>

<!--import jspdf and autotable here if imports fail 
  <script src="jspdf.plugin.autotable.min.js"></script>
-->