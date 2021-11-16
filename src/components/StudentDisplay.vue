<template>


  <div class = "listDisp">
 
    <span>{{student.studentID}} {{student.fName}}  {{student.lName}} </span>

    <router-link :to="{ name: 'coursePlan', params: { studentID: student.studentID }}"><button>Course Plan</button>
    </router-link>

    <router-link :to="{ name: 'editStudent' , params: { studentID: student.studentID }}"><button>Edit</button>
    </router-link>

    <button v-on:click="deleteStudent()" class = "back button"><span>Delete</span></button>
    <br>
    
  </div>

</template>

<script>
import StudentServices from "@/services/StudentServices.js";
export default {
  name: 'ListEntry',
  props: {
    student: Object
  },
  methods: {
    deleteStudent(){
      const answer = window.confirm(
        'Sure you wanna delete ' + this.student.fName + '? It\'ll be gone forever!'
      )
      if (answer) {
        
        StudentServices.deleteStudent(this.student.studentID); // <-- Confirm delete
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

/*https://stackoverflow.com/questions/1367409/how-to-make-button-look-like-a-link*/
</style>






