<template>
  <div>
    <h2>Search for Students</h2>   
    <input type = "text" v-model= "search" placeholder="Filter by student name &#x1F50E;&#xFE0E;	"/>
    <br>

   <!-- <button v-on:click= "cancel">Cancel</button>-->

    <student-display v-for="student in filteredStudents" :key="student.studentID" :student="student" /> 

  </div>
</template>


<script>
import StudentDisplay from '../components/StudentDisplay.vue';

import StudentServices from '@/services/StudentServices.js'
export default {
  components: { StudentDisplay },
  data() {
    return {
      students: [],
      search:''

    };
  },
  created() {
    StudentServices.getStudents()
      .then(response => {
        this.students = response.data
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  computed:{
    filteredStudents: function(){
      return this.students.filter((student) => {
        return student.fName.match(this.search);
      });
  },
  methods: {
        cancel() {
        this.$router.push({ fName: 'menu' });
      }
    }
  }

}
</script>