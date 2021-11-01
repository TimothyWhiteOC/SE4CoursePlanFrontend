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

      <div class = "form">
      <form @submit.prevent="sendForm">    
      <h2 v-if="this.isEdit">Edit {{this.advisor.fName}}</h2>
      <p v-if="message">{{this.message}}</p>

      <label for = "advisorNo">Advisor Number: &nbsp;&emsp;</label>

      <textarea v-if="isEdit" readonly id = "advisorNo" v-model="advisorNo"></textarea>
      <br>      <br>

      <label for = "fName">First Name: &nbsp;&nbsp;&emsp;&emsp;&emsp;</label>
      <input type = "text" v-model= "advisor.fName" placeholder=""/>
      <br>      <br>

      <label for = "lName">Last Name: &emsp;&nbsp;&nbsp;&emsp;&emsp;</label>
      <input type = "text" v-model= "advisor.lName" placeholder=""/>
      <br>      <br>

      
      <label for = "majorID">Department:&emsp;&emsp; &emsp;</label>
      <input type = "text" v-model= "advisor.dept" placeholder="CMSC"/>
      <br>      <br>

      <label for = "email">Email: &nbsp;&emsp; &nbsp; &nbsp;&emsp;&emsp;&emsp; </label>
      <input type = "text" v-model= "advisor.email" placeholder="example@eagles.oc.edu"/>
      <br>
      <br>
      <br>

      <button type="submit">Submit</button>
      <button v-on:click= "cancel">Cancel</button>

      </form>

</div>
</div>

   <h2 class = "title">Advisor</h2>

</div>


</template>

  
  

<script>
import AdvisorServices from '@/services/AdvisorServices.js'

export default {
  props: ['advisorID'],
  data() {
    return {
      message: null,
      advisor: {
        advisorID: "",      
        fName: "",
        lName: "",
        dept: "",
        email: ""

      },
      isEdit: false,
      advisorNo: "",
      active: false

    };
  },
  created() {
    if (this.advisorID != null){
      this.isEdit = true;
      this.advisorNo = this.advisorID;
      AdvisorServices.getAdvisor(this.advisorID)
        .then(response => {
          this.advisor = response.data[0];
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    }
  },
  methods: {
     toggle () {
      this.active = !this.active},
    sendForm (){
      if(!this.isEdit) this.addAdvisor();
      else this.updateAdvisor();
    },
    addAdvisor() {
      this.advisor.advisorID = this.advisorNo;
      AdvisorServices.addAdvisor(this.advisor)
        .then(() => {
          this.$router.push({ name: 'listAdvisors' })
        })
        .catch(error => {
          this.message = error.message;
          console.log(error);
        })
    },
    updateAdvisor() {
      AdvisorServices.updateAdvisor(this.advisorID, this.advisor)
        .then(() => {
          this.$router.push({ name: 'listAdvisors' })
        })
        .catch(error => {
          this.message = error.message
          console.log(error)
        })
    },
    cancel() {
      
      this.$router.push({ name: 'adminmenu' });
    }
  }
}
</script>
<style >

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
</style>