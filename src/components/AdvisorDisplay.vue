<template>


  <div>
    
   <!-- -->

    <span>{{advisor.advisorID}} {{advisor.fName}} </span>

   <router-link v-if="permissions" :to="{ name: 'editAdvisor' , params: { advisorID: advisor.advisorID }}">
      <button>edit</button>
    </router-link> 

    <button v-if="permissions" v-on:click="deleteAdvisor()"><span>delete</span></button>
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



<style scoped>

.edit{
  border: none;
  padding: 0!important;
  font-family: arial;
  font-size: 17px;
  color: #ffc400;
  background-color: #4385ff98;
  height: 40px;
  width: 70px;
    cursor: pointer;
}



button {
  border-radius: 0px;
  border: none;
  padding: 0!important;
  /*optional*/
  font-family: arial;
  font-size: 17px;
  color: #ffffff;
  background-color: #4385ff98;
  height: 30px;
  width: 70px;
  cursor: pointer;
  margin-left: 10px;
}


button:hover {
  background-color: #e0a606; /* Green */
  color: white;
}
/*https://stackoverflow.com/questions/1367409/how-to-make-button-look-like-a-link*/
</style>







