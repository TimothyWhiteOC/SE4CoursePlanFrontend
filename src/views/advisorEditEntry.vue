<template>
  <div class ="topMenu">Edit an Advisor</div>
  <div>
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

        <input type="button" value="Back Button" onclick="history.go(-1)">

      </form>
    </div>
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
      this.$router.push({ name: 'listAdvisors' });
    }
  }
}
</script>

