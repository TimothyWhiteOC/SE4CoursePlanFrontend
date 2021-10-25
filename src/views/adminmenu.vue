<template>
  <div class="addnew">
    <router-link :to="{ name: 'courseAdd'}"><button>Add New Course</button></router-link>

     <router-link :to="{ name: 'listCourses'}"><button>Search for Course</button></router-link>

    <router-link :to="{ name: 'studentAdd'}"><button>Add New Student</button></router-link>

     <router-link :to="{ name: 'listStudents'}"><button>Search for Students</button></router-link>


  </div>
</template>