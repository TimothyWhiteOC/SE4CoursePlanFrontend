<template>
  <div class="addnew">
    <router-link :to="{ name: 'add'}"><button>Add New Course</button></router-link>

    <router-link :to="{ name: 'listPage'}"><button>Search for Course</button></router-link>

    <router-link :to="{ name: 'listStudent'}"><button>Search for Students</button></router-link>

    
  </div>
</template>