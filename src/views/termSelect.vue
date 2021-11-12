
<template>
    <drop-down-menu pageName="Course Plan"/>

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

    <button  class = "submit" v-on:click="submit()">Submit</button>

</template>


<script>
import DropDownMenu from '../components/DropDownMenu.vue'

  export default {
     props: [],
  components: { DropDownMenu },
  data() {
    return {
        semester :
        {
            semYear: new Date().getFullYear(),
            semTerm: "FA"
        },

        isEdit: false,
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
        this.$router.push({ name: '' , params: { semYear: this.semester.semYear, semTerm: this.semester.semTerm }})
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