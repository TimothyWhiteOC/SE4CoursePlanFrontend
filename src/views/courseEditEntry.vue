<template>
  <div>
    <drop-down-menu pageName="Course List"/>
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
</template>

<script>
import CourseServices from '@/services/CourseServices.js'

import DropDownMenu from '../components/DropDownMenu.vue'

export default {
  props: ['courseNo'],
  components: { DropDownMenu },
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

