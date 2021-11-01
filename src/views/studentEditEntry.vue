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
      <h2 v-if="this.isEdit">Edit {{this.student.fName}}</h2>
      <p v-if="message">{{this.message}}</p>

      <label for = "studentNo">Student Number:&emsp;</label>

      <input type = "text" v-model= "studentNo" placeholder="XXXXXXX"/>

      <br>      <br>

      <label for = "fName">First Name: &emsp;&emsp;&emsp;</label>
      <input type = "text" v-model= "student.fName" placeholder=""/>

      <br>      <br>

      <label for = "lName">Last Name: &emsp;&emsp;&emsp;</label>
      <input type = "text" v-model= "student.lName" placeholder=""/>
      <br>      <br>

      <label for = "email">Email: &emsp; &nbsp; &nbsp;&emsp;&emsp;&emsp; </label>
      <input type = "text" v-model= "student.email" placeholder="example@eagles.oc.edu"/>
      <br>      <br>

      <label for = "majorID">Major ID:&emsp;&emsp;&emsp; &emsp;</label>
      <input type = "text" v-model= "student.majorID" placeholder="1"/>
      <br>      <br>

       <label for = "advisorID">Advisor ID: &emsp;&emsp; &emsp;</label>
      <input type = "text" v-model= "student.advisorID" placeholder="1"/>
      <br>
      <br>      <br>


      <button type="submit">Submit</button>
      <button v-on:click= "cancel">Cancel</button>
    </form>
    </div>

 

    </div>
   <h2 class = "title">Student</h2>

  </div></template>

<script>
import StudentServices from '@/services/StudentServices.js'

export default {
  props: ['studentID'],
  data() {
    return {
      message: null,
      student: {
        studentID: "",      
        fName: "",
        lName: "",
        email: "",
        majorID: "",
        advisorID:""
      },
      isEdit: false,
      studentNo: "",
      active : false
    };
  },
  created() {
    if (this.studentID != null){
      this.isEdit = true;
      this.studentNo = this.studentID;
      StudentServices.getStudent(this.studentID)
        .then(response => {
          this.student = response.data[0];
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
      if(!this.isEdit) this.addStudent();
      else this.updateStudent();
    },
    addStudent() {
      this.student.studentID = this.studentNo;
      StudentServices.addStudent(this.student)
        .then(() => {
          this.$router.push({ name: 'listStudents' })
        })
        .catch(error => {
          this.message = error.message;
          console.log(error);
        })
    },
    updateStudent() {
      StudentServices.updateStudent(this.studentID, this.student)
        .then(() => {
          this.$router.push({ name: 'listStudents' })
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