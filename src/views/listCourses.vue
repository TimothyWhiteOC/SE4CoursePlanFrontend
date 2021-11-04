<template>
  <div>
    <drop-down-menu pageName="Course List"/>
    <div>
      
      <input type = "text" v-model= "search" placeholder="Filter by course name &#x1F50E;&#xFE0E;	"/>
      <br>

    <!-- <button v-on:click= "cancel">Cancel</button>-->

      <course-display v-for="course in filteredCourses"  :key="course.courseNo" :course="course" /> 

    </div>
  </div>
</template>


<script>

import CourseServices from '@/services/CourseServices.js'
import CourseDisplay from '../components/CourseDisplay.vue'
import DropDownMenu from '../components/DropDownMenu.vue'
export default {
  components: { CourseDisplay, DropDownMenu },
  data() {
    return {
      courses: [],
      search:'Accounting',
      active:false
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
    toggle () {
      this.active = !this.active},
    cancel() {
      this.$router.push({ name: 'adminmenu' });
    }
  }
}
</script>