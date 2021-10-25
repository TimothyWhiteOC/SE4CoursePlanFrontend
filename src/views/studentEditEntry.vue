<template>
<!--  <div class="hello">-->
    <form @submit.prevent="sendForm">    
      <h2 v-if="this.isEdit">Edit {{this.student.fName}}</h2>
      <h2 v-else>Add New Student</h2>
      <p v-if="message">{{this.message}}</p>

      <label for = "studentNo">Student Number: &nbsp;&emsp;</label>

      <textarea v-if="isEdit" readonly id = "studentNo" v-model="studentNo"></textarea>
      <textarea v-else id = "studentNo" v-model="studentNo"></textarea> 
      <br>


      <label for = "fName">First Name: &emsp;&emsp;</label>
      <textarea id = "fName" v-model="student.fName"></textarea>
      <br>

      <label for = "lName">Last Name: &emsp;&emsp;</label>
      <textarea id = "lName" v-model="student.lName"></textarea>
      <br>

      <label for = "email">Email: &emsp; &nbsp; &nbsp;&emsp;&emsp;&emsp; </label>
      <textarea id = "email" v-model="student.email"></textarea>
      <br>

      <label for = "majorID">Major ID:&emsp;&emsp;&emsp;&emsp; &emsp;</label>
      <textarea id = "majorID" v-model="student.majorID"></textarea>
      <br>

       <label for = "advisorID">Advisor ID:&emsp;&emsp;&emsp;&emsp; &emsp;</label>
      <textarea id = "advisorID" v-model="student.advisorID"></textarea>
      <br>
      <br>


      <button type="submit">Submit</button>
      <button v-on:click= "cancel">Cancel</button>
    </form>
 <!-- </div>-->
</template>

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
      studentNo: ""
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