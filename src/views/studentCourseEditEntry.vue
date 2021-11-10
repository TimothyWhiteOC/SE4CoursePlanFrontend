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
      <input type = "text" v-model= "sCourse.studentID" placeholder=""/>
      <br>      <br>

      <label for = "courseNo">Course Number:&emsp;&emsp;&emsp;</label>
      <input type = "text" v-model= "sCourse.courseNo" placeholder=""/>
      <br>      <br>

      
      <label for = "semTerm">Semester Term:&emsp;&emsp; &emsp;</label>
      <input type = "text" v-model= "sCourse.semTerm" placeholder=""/>
      <br>      <br>

      <label for = "semYear">Semester Year: &emsp;&emsp;&emsp; </label>
      <input type = "text" v-model= "sCourse.semYear" placeholder=""/>
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
  ],
  data() {
    return {
      message: null,
      sCourse: {},
      isEdit: false,
      active : false
    }},

  created() { 
    StudentCourseServices.getStudentCourse(this.studentID, this.courseNo)
    .then(response => {
        this.sCourse = response.data[0]
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
    console.log("Help: ");
    console.log(this.sCourse.courseNo);
  },
  methods: {
    toggle () {
      this.active = !this.active},
    sendForm (){
      if(!this.isEdit) this.addCourseToStudent();
      else this.addCourseToStudent();
    },  
    addCourseToStudent() {
    //  this.course.courseNo = this.courseNo;      
      StudentCourseServices.addStudentCourse(this.studentID, this.sCourse)
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






