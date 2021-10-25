<template>
  <div>
    <h2>Search for Courses</h2>   
    <input type = "text" v-model= "search" placeholder="Filter by course name &#x1F50E;&#xFE0E;	"/>
    <br>

   <!-- <button v-on:click= "cancel">Cancel</button>-->

    <course-display v-for="course in filteredCourses" :key="course.courseNo" :course="course" /> 

  </div>
</template>


<script>

import CourseServices from '@/services/CourseServices.js'
import CourseDisplay from '../components/CourseDisplay.vue';
export default {
  components: { CourseDisplay },
  data() {
    return {
      courses: [],
      search:''

    };
  },
  created() {
    CourseServices.getCourses()
      .then(response => {
        this.courses = response.data
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  computed:{
    filteredCourses: function(){
      return this.courses.filter((course) => {
        return course.name.match(this.search);
      });
    }
  },
  methods: {
        cancel() {
        this.$router.push({ name: 'adminmenu' });
      }
    }
  

}
</script>