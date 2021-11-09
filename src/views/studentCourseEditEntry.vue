<template>
   <div>
    <drop-down-menu pageName="Edit Student Course"/>
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






