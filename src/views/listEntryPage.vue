<template>
<!--  <div class="hello">-->
    <form @submit.prevent="sendForm">    
      <h2 v-if="this.isEdit">Edit {{this.course.name}}</h2>
      <h2 v-else>Add New Course</h2>
      <p v-if="message">{{this.message}}</p>
      
      <label for = "dept">Department: &nbsp;&nbsp;&nbsp;&emsp;&emsp;</label>
      <textarea id = "dept" v-model="course.dept"></textarea>  
      <br>

      <label for = "courseID">Course Number: &nbsp;&emsp;</label>
      <textarea v-if="isEdit" readonly id = "courseID" v-model="courseID"></textarea>
      <textarea v-else id = "courseID" v-model="courseID"></textarea>
      <br>

      <label for = "name">Course Name: &emsp;&emsp;</label>
      <textarea id = "name" v-model="course.name"></textarea>
      <br>

      <label for = "level">Level: &emsp; &nbsp; &nbsp;&emsp;&emsp;&emsp; </label>
      <textarea id = "level" v-model="course.level"></textarea>
      <br>

      <label for = "hours">Hours:&emsp;&emsp;&emsp;&emsp; &emsp;</label>
      <textarea id = "hours" v-model="course.hours"></textarea>
      <br>

      <label for = "description">Course Description:&nbsp; </label>
      <textarea id = "description" v-model="this.course.description"></textarea>
      <!--took some cues from Vue intro and vue form tutorial repos to implement-->
      <br>
      <br>


      <button type="submit">Submit</button>
      <button v-on:click= "cancel">Cancel</button>
    </form>
 <!-- </div>-->
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
        level: 0,
        hours: 0,
        name: "",
        description: ""
      },
      isEdit: false,
      courseID: ""
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
    sendForm (){
      if(!this.isEdit) this.addCourse();
      else this.updateCourse();
    },
    addCourse() {
      this.course.courseNo = this.courseID;
      CourseServices.addCourse(this.course)
        .then(() => {
          this.$router.push({ name: 'listPage' })
        })
        .catch(error => {
          this.message = error.message;
          console.log(error);
        })
    },
    updateCourse() {
      CourseServices.updateCourse(this.courseNo, this.course)
        .then(() => {
          this.$router.push({ name: 'listPage' })
        })
        .catch(error => {
          this.message = error.message
          console.log(error)
        })
    },
    cancel() {
      this.$router.push({ name: 'menu' });
    }
  }
}
</script>

