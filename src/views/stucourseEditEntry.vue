<template>
  <div class="topMenu">
  <div class="dropdown">
    
    <button class="dropbtn" onclick="this.classList.toggle('opened');this.setAttribute('aria-expanded', this.classList.contains('opened'))" aria-label="Main Menu" @click="toggle">
      <svg width="100" height="100" >
        <path class="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
        <path class="line line2" d="M 20,50 H 80" />
        <path class="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
      </svg>  
      </button>

    <div v-if="active">
      <div class="dropdown-content">
      <a><router-link :to="{ name: 'courseAdd'}">Add New Course</router-link></a>

     <a><router-link :to="{ name: 'listCourses'}">Search for Course</router-link></a>

     <a> <router-link :to="{ name: 'studentAdd'}">Add New Student</router-link></a>

    <a> <router-link :to="{ name: 'listStudents'}">Search for Students</router-link></a>

     <a> <router-link :to="{ name: 'advisorAdd'}">Add New Advisor</router-link></a>

     <a><router-link :to="{ name: 'listAdvisors'}">Search for Advisors</router-link></a>
    </div>

   </div>

      <div class = "form">
        <form @submit.prevent="sendForm">    
      <h2 v-if="this.isEdit">Edit {{this.course.name}}</h2>
      <p v-if="message">{{this.message}}</p>

     <!-- <label for = "advisorNo">Advisor Number: &nbsp;&emsp;</label>-->

      <textarea v-if="isEdit" readonly id = "advisorNo" v-model="advisorNo"></textarea>
      <br>      <br>

      <label for = "studentID">Student ID: &nbsp; &nbsp; &nbsp; &nbsp;&emsp;&emsp;&emsp;</label>
      <input type = "text" v-model= "scourse.studentID" placeholder=""/>
      <br>      <br>

      <label for = "courseNo">Course Number:&emsp;&emsp;&emsp;</label>
      <input type = "text" v-model= "scourse.courseNo" placeholder=""/>
      <br>      <br>

      
      <label for = "semTerm">Semester Term:&emsp;&emsp; &emsp;</label>
      <input type = "text" v-model= "scourse.semTerm" placeholder=""/>
      <br>      <br>

      <label for = "semYear">Semester Year: &emsp;&emsp;&emsp; </label>
      <input type = "text" v-model= "scourse.semYear" placeholder=""/>
      <br>
      <br>

     <!--  <label for = "grade">Grade: &nbsp;&emsp;&nbsp;&emsp; &nbsp; &nbsp;&emsp;&emsp;&emsp; </label>
      <input type = "text" v-model= "scourse.grade" placeholder=""/>
      <br>
      <br>
      <br>-->

     <button type="submit">Submit</button>
      <button v-on:click= "cancel">Cancel</button>

      </form>

</div>
</div>

   <h2 class = "title">Adding Course to Semester Form</h2>

</div>
</template>


<script>
import StudentCourseServices from "@/services/StudentCourseServices.js";
import CourseServices from "@/services/CourseServices.js";

export default {
 
    props: [
    'courseNo',
    'studentID',
    'semTerm',
    'semYear'
  ],
   data() {
    return {
      message: null,
      scourse: 
      {
        studentID: this.studentID,      
        courseNo: this.courseNo,
        semTerm: this.semTerm,
        semYear: this.semYear,
        grade: ""
      },
        isEdit: false,
      active : false

    }},

  
 methods: {
    toggle () {
      this.active = !this.active},
    sendForm (){
      if(!this.isEdit) this.addCourseToStudent();
      else this.addCourseToStudent();
    },  
      created() {
    if (this.scourse != null){
     window.confirm(
        'Sure you wanna add ' + this.studentID + '? It\'ll be gone forever!'
      )
    }
     },
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


   addCourse() {
      this.course.courseNo = this.course;
      CourseServices.addCourse(this.course)
        .then(() => {
          this.$router.push({ name: 'listCourses' })
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
 /* methods: {
       toggle () {
      this.active = !this.active},
    sendForm (){
      if(!this.isEdit) this.addCourse();
      else this.updateCourse();
    },
    
    updateCourse() {
      CourseServices.updateCourse(this.courseNo, this.course)
        .then(() => {
          this.$router.push({ name: 'listCourses' })
        })
        .catch(error => {
          this.message = error.message
          console.log(error)
        })
    }
  }*/

</script>






