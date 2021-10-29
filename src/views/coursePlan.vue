<template>
  <div>
    <h2> {{student.fName}} {{student.lName}} Course Plan</h2>
    <button v-on:click= "makePDF">Save PDF</button>
    <button v-on:click= "cancel">Back</button>
    <h3>Hours Completed: {{totalHours}}   GPA: {{GPA}}</h3>
    <h3>Major Credit Earned: {{totalMajorHours}}    Major GPA: {{majorGPA}}</h3>
    <br>
    <cor-plan-semester-display v-for="semester in semesters" :key="semester.semTerm" :semester="semester"/>


  <!--<degree-audit-course v-for="course in auditCourses" :key="course.majorCourse.courseNo" :auditCourse="course"/> -->

  </div>
</template>

<!--<script src="jspdf.plugin.autotable.min.js"></script>-->

<script>
// https://www.npmjs.com/package/jspdf
import { jsPDF } from "jspdf";
// https://www.npmjs.com/package/jspdf-autotable
import 'jspdf-autotable';


import StudentCourseServices from '@/services/StudentCourseServices.js';
import MajorCourseServices from '@/services/MajorCourseServices.js';
import StudentServices from '@/services/StudentServices.js';

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
      totalMajorHours: 0,
      GPA: 0,
      undivGPA: 0,
      majorGPA: 0,
      undivMajorGPA: 0,
      student: {}
    };
  },
  async created() {
    var studentCourses = {};
    var semester = {};
    var majorCourses = {};
    var gpaWeight = {};

    await StudentServices.getStudent(this.studentID)
      .then(response => {
        this.student = response.data[0]
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
    
    await StudentCourseServices.getStudentCourses(this.studentID)
      .then(response => {
        studentCourses = response.data
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
    
    await MajorCourseServices.getMajorCourses(this.student.majorID)
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
    for (var sCourse of studentCourses) {
      // semester = this.semesters.find(getSemesterExists, sCourse);
      /*semester = this.semesters.find(getSemesterExists, {
        semTerm: "no",
        semYear: 1909
      });*/
      if (!compareTerm(semester, sCourse)) {
        semester = {
          semTerm: sCourse.semTerm,
          semYear: sCourse.semYear,
          GPA: 0,
          undivGPA: 0,
          semHours: 0,
          majorGPA: 0,
          undivMajorGPA: 0,
          semMajorHours: 0,
          courses: new Array()
        };
        this.semesters.push(semester);
      }
      semester.courses.push(sCourse);
      gpaWeight = letterGradeToGPA(sCourse.grade, sCourse.hours);
      semester.semHours += gpaWeight.weight;
      this.totalHours += gpaWeight.weight;
      semester.undivGPA += gpaWeight.val;
      this.undivGPA += gpaWeight.val;
      
      if (majorCourses.find(getCreditedCourse, sCourse)) {
        semester.semMajorHours += gpaWeight.weight;
        this.totalMajorHours += gpaWeight.weight;
        semester.undivMajorGPA += gpaWeight.val;
        this.undivMajorGPA += gpaWeight.val;
      }
    }

    console.log("uGPA: " + this.undivGPA);


    // https://stackoverflow.com/questions/45381590/js-limit-the-number-of-decimal-places-in-a-number
    for (var s of this.semesters) {
      if (s.semHours > 0) s.GPA += (s.undivGPA / s.semHours).toFixed(2);
      if (s.semMajorHours > 0) s.majorGPA += (s.undivMajorGPA / s.semMajorHours).toFixed(2);
    }

    if (this.totalHours > 0) this.GPA += (this.undivGPA / this.totalHours).toFixed(2);
    if (this.semMajorHours > 0) this.majorGPA += (this.undivMajorGPA / this.totalMajorHours).toFixed(2);


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
    },
    // may need to install jspdf, autotable
    // https://stackoverflow.com/questions/54069884/installing-jspdf-using-npm-command
    // https://cnpmjs.org/package/jspdf-autotable
    // or may need to import
    // i used the tutorial code here because its code works
    // https://codingshiksha.com/vue/vue-js-pdf-generator-in-vuetify-ui-using-jspdf-and-jspdf-autotable-library-full-tutorial-for-beginners/
    makePDF() {
      const columns = [
        { title: "Course No.", dataKey: "courseNo" },
        { title: "Body", dataKey: "body" }
      ];
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "letter"
      });
      doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
      // text is placed using x, y coordinates
      // doc.setFontSize(16).text(this.student.fName + " " + this.student.lName + "CoursePlan", 0.5, 1.0);
      // create a line under heading 
      doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
      // overall Data
      doc.setFontSize(12);
      doc.text(this.student.fName + " " + this.student.lName + "CoursePlan", 0.5, 1.0);
      
      for (var s of this.semesters) {
        doc.text(s.semTerm + "  " + s.semYear + " Hours: " + s.semHours + "  GPA: " + s.GPA +
        " Major Credit: " + s.majorGPA, 0.5, 1.0);
        // Using autoTable plugin
        doc.autoTable({
          columns,
          body: s.courses,
          margin: { left: 0.5, top: 1.25 }
        });
      }
      
      // Creating footer and saving file
      doc.save(`${this.heading}.pdf`);
    }
  }
}

function getCreditedCourse(courseNo) {
  return courseNo == this.currentCourseNo;
}

function compareTerm(a, b) {
  return ((a.semTerm === b.semTerm) && (a.semYear === b.semYear));
}

function letterGradeToGPA(grade, hours) {
  var gpa = {
    val: 0,
    weight: 0
  }; 
  if (grade === "A") {
    gpa.val = 4 * hours;
    gpa.weight = hours;
  }
  else if (grade === "B") {
    gpa.val = 3 * hours;
    gpa.weight = hours;
  }
  else if (grade === "C") {
    gpa.val = 2 * hours;
    gpa.weight = hours;
  }
  else if (grade === "D") {
    gpa.val = 1 * hours;
    gpa.weight = hours;
  }
  else if (grade === "F") {
    gpa.val = 0 * hours;
    gpa.weight = hours;
  } 
  return gpa;
}

/*
function getSemesterExists(semester) {
  return (semester.semTerm === this.semTerm && semester.year === this.semYear);
}*/

// https://www.w3schools.com/jsref/jsref_sort.asp
/*function a(courseNo) {
  return courseNo == this.currentCourseNo;
}*/
</script>

