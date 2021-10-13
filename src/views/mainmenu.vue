<template>
  <div class="addnew">
      <router-link :to="{ name: 'add'}"><button>Add New Course</button></router-link>
      <course-display v-for="course in courses" :key="course.courseNo" :course="course" />

     <router-link :to="{ name: 'listPage'}"><button>Search for Course</button></router-link>
      <course-display v-for="course in courses" :key="course.courseNo" :course="course" />


  </div>
</template>