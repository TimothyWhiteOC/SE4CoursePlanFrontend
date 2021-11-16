<template>
      <div class ="topMenu">Advisor List</div>

  <div>
    <!-- <button v-on:click= "cancel">Cancel</button>-->
    <input  class = "search" type = "text" v-model= "search" placeholder="Filter by advisor name &#x1F50E;&#xFE0E;	"/>
    <br>
    <advisor-display class = "listDisp"  v-for="advisor in filteredAdvisors" :key="advisor.advisorID" :advisor="advisor" :permissions="permissions"/> 

  </div>
</template>


<script>
import AdvisorDisplay from '../components/AdvisorDisplay.vue';

import { getStore } from "@/store/store"

import AdvisorServices from '@/services/AdvisorServices.js'
export default {
  components: {  AdvisorDisplay },
  data() {
    return {
      advisors: [],
      search:'',
      active: false,
      permissions: false
    };
  },
  created() {
    var role = getStore('user').role;
    this.permissions = (role == "admin");

    AdvisorServices.getAdvisors()
      .then(response => {
        this.advisors = response.data
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  computed:{
    filteredAdvisors: function(){
      return this.advisors.filter((advisor) => {
        return advisor.fName.match(this.search);
      });
    }
  },
  methods: {
    toggle () {
        this.active = !this.active},
      cancel() {
      this.$router.push({ fName: 'adminmenu' });
    }
  }
  

}
</script>