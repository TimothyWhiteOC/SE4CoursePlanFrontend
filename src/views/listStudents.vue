<template>
      <div class ="topMenu">Student List</div>

  <div>
    <div>
      <input class="search" v-model= "search" placeholder="Filter by student name &#x1F50E;&#xFE0E;	"/>
      <student-display v-for="student in filteredStudents" :key="student.studentID" :student="student" />
    </div>
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
      search:'',
      active: false

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



