<template>


  <div class="listDisp">
    
   <!-- -->

    <span>{{course.courseNo}} {{course.name}} </span>

   <router-link v-if="permissions" :to="{ name: 'editCourse' , params: { courseNo: course.courseNo }}">
      <button class = "back button">Edit</button>
    </router-link> 

    <button v-if="permissions" v-on:click="deleteCourse()"><span>Delete</span></button>
    <br>
    <br>
  </div>
    



</template>

<script>
import CourseServices from "@/services/CourseServices.js";
export default {
  name: 'ListEntry',
  props: {
    course: Object,
    permissions: Boolean
  },
  methods: {
    deleteCourse(){
      // from https://www.vuemastery.com/courses/touring-vue-router/in-component-route-guards
      const answer = window.confirm(
        'Sure you wanna delete ' + this.course.name + '? It\'ll be gone forever!'
      )
      if (answer) {
        
        CourseServices.deleteCourse(this.course.courseNo); // <-- Confirm delete
        // https://stackoverflow.com/questions/40445125/how-can-component-delete-itself-in-vue-2-0
        this.$delete;
        this.$el.parentNode.removeChild(this.$el);
      } 
    }
    
  }
}
</script>







