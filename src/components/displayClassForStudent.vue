<template>


  <div class="listDisp">

    <span>{{course.courseNo}} {{course.name}} </span>

   <router-link :to="{ name: 'editCourse' , params: { courseNo: course.courseNo }}">
    <button>ignore</button>
    </router-link> 
  
  <!--  <button><router-link :to="{ name: 'stucourseEditEntry', params:{courseNo : course.courseNo}}">add</router-link></button>
    <br>
    <br>-->

       <button @click='showCourse(course.courseNo)'>Choose This Course</button>


    <button> <!--<router-link :to="{ name: 'stucourseEditEntry', params:{semTerm : semester.semTerm, semYear : semester.semYear}}">
     edit </router-link> --> Nowhere</button>

  </div>

</template>

<script>

import CourseServices from '@/services/CourseServices.js'
import StudentCourseServices from "@/services/StudentCourseServices.js";

export default {

    props: [
    'course',
    'studentID',
    'semTerm',
    'semYear'
  ],
  data() {
    return {
      courses: [],
      search:'Accounting',
      active:false,
      scourse: 
      {
        studentID: "",      
        courseNo: "",
        semTermy: "",
        semYeary: "",
        grade: ""
      },
      courseNum:'',
    };
  },
  created() {
    CourseServices.getCourses()
      .then(response => {
        this.courses = response.data
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
       
      if (this.semTerm != null){
      this.semTermy = this.semTerm;

    }
    this.courseNum = this.course.courseNo;
        if (this.semYear != null){
      this.semYeary = this.semYear;
      }
  },
  computed:{
    filteredCourses: function(){
      return this.courses.filter((course) => {
        return course.name.match(this.search);
      });
    }
  },
  methods: {

    toggle () {
        this.active = !this.active},
        sendForm (){
      if(!this.isEdit) this.addCourseToStudent();
      else this.addCourseToStudent();
    },    
    showCourse(courseNum){
      this.$emit('courseSelected', courseNum)
    } ,
      addCourseToStudent() {
    //  this.course.courseNo = this.courseNo;      
      StudentCourseServices.addStudentCourse(this.studentID, this.scourse)
        .then(() => {
          this.$router.push({ name: 'coursePlan' })
        })
        .catch(error => {
          this.message = error.message;
          console.log(error);
        })
    },
        cancel() {
      this.$router.push({ name: 'coursePlan' });
    }
}
}

</script>







