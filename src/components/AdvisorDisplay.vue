<template>


  <div class="courseDisp">
    
   <!-- -->

    <span>{{course.courseNo}} {{course.name}} </span>

   <router-link :to="{ name: 'editCourse' , params: { courseNo: course.courseNo }}">
      <button>edit</button>
    </router-link> 

    <button v-on:click="deleteCourse()"><span>delete</span></button>
    <br>
    <br>

  </div>
    



</template>

<script>
import CourseServices from "@/services/CourseServices.js";
export default {
  name: 'ListEntry',
  props: {
    course: Object
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
  size: 20px;
}
ul {
  list-style-type: none;
  padding: 0px;
}
li {
  display: inline-block;
  margin: 0 10px;
  
}
a {
  text-decoration: none;
  
  }
.edit{
  border: none;
  padding: 0!important;
  font-family: arial;
  font-size: 17px;
  color: #ffc400;
  background-color: #6e000098;
  height: 40px;
  width: 70px;
    cursor: pointer;
}
.courseDisp {
 /* padding: 10px; */
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 100px;
  margin-right: 100px;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
  font-weight: normal;
  
  background-color: rgba(143, 11, 11, 0.856);
}

button {
  border: none;
  padding: 0!important;
  /*optional*/
  font-family: arial;
  font-size: 17px;
  color: #ffffff;
  background-color: #6e0000;
  height: 30px;
  width: 70px;
  cursor: pointer;
  margin-left: 10px;
}


button:hover {
  background-color: #e0a606; /* Green */
  color: white;
}
</style>

<!--dont include ID itll just make one -->




