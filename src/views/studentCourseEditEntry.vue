<template>
   <div>
      <div class ="topMenu">Edit a Student Course</div>


      <!-- <label for = "advisorNo">Advisor Number: &nbsp;&emsp;</label>-->

      <!--<textarea v-if="isEdit" readonly id = "advisorNo" v-model="advisorNo"></textarea>-->
      <br>      <br>

      <label for = "studentID">Student ID: &nbsp; &nbsp; &nbsp; &nbsp;&emsp;&emsp;&emsp;</label>
      <label type = "text" placeholder="">{{this.sCourse.studentID}}</label>
      <br>      <br>

      <label for = "courseNo">Course Number:&emsp;&emsp;&emsp;</label>
      <label type = "text" placeholder="">{{this.sCourse.courseNo}}</label>

      <br>      <br>

      
      <label for = "semTerm">Semester Term:&emsp;&emsp; &emsp;</label>
      <label type = "text" placeholder="">{{this.sCourse.semTerm}}</label>

      <br>      <br>

      <label for = "semYear">Semester Year: &emsp;&emsp;&emsp; </label>
      <label type = "text" placeholder="">{{this.sCourse.semYear}}</label>
      <br>      <br>
     
         <div class="container">
        <label for = "grade" >Grade: &emsp;&emsp;&emsp;</label>
        <button class = "drop" @click="toggle">{{this.sCourse.grade}}</button>
        <div v-if="active">
          <button class = "drop2" v-on:click="aSelected()">A</button>
          <br>
          <button class = "drop2" v-on:click="bSelected()">B</button>
          <br>
          <button class = "drop2" v-on:click="cSelected()">C</button>
          <br>
          <button class = "drop2" v-on:click="dSelected()">D</button>
          <br>
          <button class = "drop2" v-on:click="fSelected()">F</button>
          <br>
          <button class = "drop2" v-on:click="noneSelected()">-</button>
        </div>
      </div>


      <br>
      <br>

      <button v-on:click= "submit" >Submit</button> 
      <button class = "back button" v-on:click= "cancel">Cancel</button>

      </div>   
</template>


<script>
import StudentCourseServices from "@/services/StudentCourseServices.js";

export default {


  props: [
    'courseNo',
    'studentID',
  ],
  data() {
    return {
      message: null,
  
      sCourse:{},

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
  },
  methods: {
     toggle () {
        this.active = !this.active
      },

      aSelected(){
        this.sCourse.grade = "A";
      },
      bSelected(){
        this.sCourse.grade = "B";
      },
      cSelected(){
        this.sCourse.grade = "C";
      },
      dSelected(){
        this.sCourse.grade = "D";
      },
      fSelected(){
        this.sCourse.grade = "F";
      },
      noneSelected(){
        this.sCourse.grade = "-";
      },

    submit() {
      // console.log("student:");
      // console.log(this.studentID);
      // console.log("courseNo:");
      // console.log(this.courseNo);
      // console.log("course:");
      // console.log(this.sCourse);
      StudentCourseServices.updateStudentCourse(this.studentID, this.courseNo, this.sCourse)
        .then(() => {
          //console.log("success");
          this.$router.push({ name: 'coursePlan', params: {studentID: this.studentID} })
        })
        .catch(error => {
          //console.log("failure");
          this.message = error.message;
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

<style>
.drop {
    color: aliceblue;
    background-color: rgb(82, 148, 185);

}
.drop2 {
    color: aliceblue;
    background-color: rgb(151, 186, 206);
    margin-right: -184px;
}

.container{
    height: 190px;
    margin: auto;
    background-color: rgba(0, 0, 0, 0);
}
</style>







