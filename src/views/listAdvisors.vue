<template>
  <div class="topMenu">
  <div class="dropdown">
    
    <button class="dropbtn" onclick="this.classList.toggle('opened');this.setAttribute('aria-expanded', this.classList.contains('opened'))" aria-label="Main Menu" @click="toggle">
      <svg width="100" height="100" >
        <path class="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
        <path class="line line2" d="M 20,50 H 80" />
        <path class="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
      </svg>  
      </button>

    <div v-if="active">
      <div class="dropdown-content">
      <a><router-link :to="{ name: 'courseAdd'}">Add New Course</router-link></a>

     <a><router-link :to="{ name: 'listCourses'}">Search for Course</router-link></a>

     <a> <router-link :to="{ name: 'studentAdd'}">Add New Student</router-link></a>

    <a> <router-link :to="{ name: 'listStudents'}">Search for Students</router-link></a>

     <a> <router-link :to="{ name: 'advisorAdd'}">Add New Advisor</router-link></a>

     <a><router-link :to="{ name: 'listAdvisors'}">Search for Advisors</router-link></a>
    </div>
    </div>

   <!-- <button v-on:click= "cancel">Cancel</button>-->
 
   </div>
      <h2 class = "title">List of Advisors</h2>

    <input  class = "search" type = "text" v-model= "search" placeholder="Filter by advisor name &#x1F50E;&#xFE0E;	"/>
    <br>
    <advisor-display class = "listDisp"  v-for="advisor in filteredAdvisors" :key="advisor.advisorID" :advisor="advisor"/> 


  </div>
</template>


<script>
import AdvisorDisplay from '../components/AdvisorDisplay.vue';

import AdvisorServices from '@/services/AdvisorServices.js'
export default {
  components: { AdvisorDisplay },
  data() {
    return {
      advisors: [],
      search:'',
      active : false

    };
  },
  created() {
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