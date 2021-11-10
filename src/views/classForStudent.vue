<template>
  <div>
    <drop-down-menu pageName="Add a Course"/>
    <div>
      <h2 class = "title">List of Courses to add</h2>
     
      <input type = "text" v-model= "search" placeholder="Filter by course name &#x1F50E;&#xFE0E;	"/>
      <br>

      <!-- <button v-on:click= "cancel">Cancel</button>-->

      <display-class-for-student v-for="course in filteredCourses" :key="course.courseNo" :course="course" @courseSelected="courseSelected"  /> 
    </div>
  </div>
</template>


<script>

import CourseServices from '@/services/CourseServices.js'
import StudentCourseServices from "@/services/StudentCourseServices.js";
import displayClassForStudent from '../components/displayClassForStudent.vue';

export default {
  components: { displayClassForStudent },
    props: [
    'studentID',
    'semTerm',
    'semYear'
  ],
  data() {
    return {
      courses: [],
      search:'Accounting',
      active: false,
    };
  },
  created() {
    CourseServices.getCoursesBySemester(this.semTerm)
    .then(response => {
      this.courses = response.data
    })
    .catch(error => {
      console.log('There was an error:', error.response)
    })
  },
  computed:{
    filteredCourses: function(){
      return this.courses.filter((course) => {
        return course.name.match(this.search);
      });
    }
  },
  methods: {
    courseSelected(currentCourse){
      var sCourse = {
          studentID: this.studentID,      
          courseNo: currentCourse,
          semTerm: this.semTerm,
          semYear: this.semYear,
          grade: "-"
        };

      console.log("test: " + sCourse.studentID);
      console.log("test: " + sCourse.courseNo);
      console.log("test: " + sCourse.semTerm);
      console.log("test: " + sCourse.semYear);
      console.log("test: " + sCourse.grade);
      StudentCourseServices.addStudentCourse(this.studentID, sCourse)
        .then(() => {
          this.$router.push({ name: 'coursePlan', params: {studentID: this.studentID} })
        })
        .catch(error => {
          this.message = error.message;
          console.log(error);
        })
      //this.$router.push({ name: 'studentCourseEditEntry' , params: {courseNo: currentCourse}});
    },
    toggle () {
      this.active = !this.active},
    cancel() {
      this.$router.push({ name: 'coursePlan' });
    }
  }
}

</script>