
<template>
  <div>
    <div class ="topMenu">Select Term</div>
  
    <br><br>    <br><br>
    <label for = "semYear">Semester Year: &emsp;&emsp;</label>
    <input type = "text" v-model= "semester.semYear" placeholder=""/>
    <br><br>    <br><br>

    <div class="container">
    <button class = "drop" @click="toggle">{{this.semester.semTerm}}</button>
      <div v-if="active">
        <button class = "drop2" v-on:click="fallSelected()">Fall</button>
        <br>
        <button class = "drop2" v-on:click="springSelected()">Spring</button>
      </div>
    </div>
    <button class = "submit" v-on:click="submit()">Submit</button>
    <router-link :to="{ name: 'coursePlan', params: { studentID: studentID }}">          <button>Cancel</button>
    </router-link>
  </div>
</template>


<script>

  export default {
  props: ['studentID'],
  data() {
    return {
        semester :
        {
            semYear: new Date().getFullYear(),
            semTerm: "FA"
        },
        // isEdit: false,
        active: false
    };
  },
    methods: {
      toggle () {
        this.active = !this.active
      },
      fallSelected(){
        this.semester.semTerm = "FA";
      },
      springSelected(){
        this.semester.semTerm = "SP";
      },
      submit(){
        this.$router.push({ name: 'classForStudent' , params: {studentID: this.studentID,  semTerm: this.semester.semTerm, semYear: this.semester.semYear }})
      }
    }
  }
</script>
<style scoped>

.submit {
    color: aliceblue;
    background-color: rgb(82, 148, 185);
}
.drop {
    color: aliceblue;
    background-color: rgb(82, 148, 185);
    margin-right: 280px;
}
.drop2 {
    color: aliceblue;
    background-color: rgb(151, 186, 206);
    margin-right: 280px;

}

button:hover {
  background-color: #3e8e41;
}

.container{
    width: 400px;
    height: 100px;
    margin: auto;
 /*   background-color: black;*/
}

</style>