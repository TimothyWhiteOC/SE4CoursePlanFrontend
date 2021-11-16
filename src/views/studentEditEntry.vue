<template>
  <div>
    <div v-if="isEdit" class ="topMenu">Edit Student</div>
    <div v-else class ="topMenu">Add Student</div>
    <div class = "form">
      <form @submit.prevent="sendForm">
        <h2 v-if="this.isEdit">Edit {{this.student.fName}} {{this.student.lName}}</h2>
        <p v-if="message">{{this.message}}</p>

        
        <div v-if="isEdit">
          <label for = "studentID">Student ID: &nbsp;&nbsp;&emsp;&emsp;&emsp;</label>
          <label >{{studentID}}</label>
          <br>      <br>
        </div>

        
        <div v-else>
          <label for = "studentID">Student ID: &nbsp;&nbsp;&emsp;&emsp;&emsp;</label>
          <input type = "text" v-model= "student.studentID" placeholder=""/>
          <br>      <br>
        </div>

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
        <button v-if="isEdit" class = "back button" v-on:click= "cancel">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import StudentServices from '@/services/StudentServices.js'


export default {
  props: ['studentID'],

  /*
    props: [
    'courseNo',
    'studentID',
    'semTerm',
    'semYear'
     ],
  */    

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
      //studentNo: "",
      active : false
    };
  },
  created() {
    if (this.studentID != null){
      this.isEdit = true;
      //this.studentNo = this.studentID;
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
      //this.student.studentID = this.studentNo;
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
      this.$router.push({ name: 'listStudents' });
    }
  }
}
</script>