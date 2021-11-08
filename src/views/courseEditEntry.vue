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
      <!--<h2 v-else>Add New Course</h2>-->
      <p v-if="message">{{this.message}}</p>
      
      <label for = "dept">Department: &nbsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;</label>
      <input type = "text" v-model= "course.dept" placeholder="CMSC, ACCT"/>
      <br>
      <br>

      <label for = "courseID">Course Number: &nbsp;&emsp;</label>
      <input type = "text" v-model= "courseID" placeholder="CMSC-0020, ACCT-0010"/>
      <br>      <br>


      <label for = "name">Course Name: &emsp; &emsp;</label>
      <input type = "text" v-model= "course.name" placeholder="Accounting Lower Division"/>
      <br>      <br>


      <label for = "level">Level: &nbsp;&nbsp;&nbsp;&emsp;&nbsp;&nbsp; &nbsp;&emsp;&emsp;&emsp; </label>
      <input type = "text" v-model= "course.level" placeholder="3, 4, 5"/>
      <br>      <br>


      <label for = "hours">Hours: &nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp; &emsp;</label>
      <input type = "text" v-model= "course.hours" placeholder="2, 3, 4"/>
      <br>      <br>


      <label for = "description">Course Description:&nbsp; </label>
        <input type = "text" v-model= "this.course.description" placeholder="Issues in Advanced Accounting Concepts"/>
      <br>

      <br>
      <br>


      <button type="submit">Submit</button>
      <button v-on:click= "cancel">Cancel</button>
    </form>
    </div>
  
    </div>
   <h2 class = "title">Course</h2>

  </div>
</template>

<script>
import CourseServices from '@/services/CourseServices.js'

export default {
  props: ['courseNo'],
  data() {
    return {
      message: null,
      course: {
        dept: "",
        courseNo: "",      
        level: "",
        hours: "",
        name: "",
        description: ""
      },
      isEdit: false,
      courseID: "",
      active : false
    };
  },
  created() {
    if (this.courseNo != null){
      this.isEdit = true;
      this.courseID = this.courseNo;
      CourseServices.getCourse(this.courseNo)
        .then(response => {
          this.course = response.data[0];
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    }
  },
  methods: {
       toggle () {
      this.active = !this.active},
    sendForm (){
      if(!this.isEdit) this.addCourse();
      else this.updateCourse();
    },
    addCourse() {
      this.course.courseNo = this.courseID;
      CourseServices.addCourse(this.course)
        .then(() => {
          this.$router.push({ name: 'listCourses' })
        })
        .catch(error => {
          this.message = error.message;
          console.log(error);
        })
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
    },
    cancel() {
      this.$router.push({ name: 'adminmenu' });
    }
  }
}
</script>

