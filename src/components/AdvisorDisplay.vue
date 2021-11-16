<template>


  <div>
    
   <!-- -->

    <span>{{advisor.advisorID}} {{advisor.fName}} {{advisor.lName}} </span>

   <router-link v-if="permissions" :to="{ name: 'editAdvisor' , params: { advisorID: advisor.advisorID }}">
      <button class = "back button">Edit</button>
    </router-link> 

    <button v-if="permissions" v-on:click="deleteAdvisor()"><span>Delete</span></button>
    <br>
    <br>

  </div>
    



</template>

<script>
import AdvisorServices from "@/services/AdvisorServices.js";
export default {
  name: 'ListEntry',
  props: {
    advisor: Object,
    permissions: Boolean
  },
  methods: {
    deleteAdvisor(){
      // from https://www.vuemastery.com/advisors/touring-vue-router/in-component-route-guards
      const answer = window.confirm(
        'Sure you wanna delete ' + this.advisor.fName + '? It\'ll be gone forever!'
      )
      if (answer) {
        
        AdvisorServices.deleteAdvisor(this.advisor.advisorID); // <-- Confirm delete
        // https://stackoverflow.com/questions/40445125/how-can-component-delete-itself-in-vue-2-0
        this.$delete;
        this.$el.parentNode.removeChild(this.$el);
      } 
    }
    
  }
}
</script>










