<template>
  <div id="app">
    <h1>Admin Page</h1>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family:  'Arial';
  text-align: center;
  color: #252525;
  font-size: 307upx;
  background-color: rgba(255, 255, 255, 0.932);
  height: 200px;
}

h2{
  color: #002761;
}

label{
  color: #002e74;
}

button {
  border: none;
  padding: 0!important;
  /*optional*/
  font-family: arial;
  font-size: 30px;
  color: #ffffff;
  background-color: #6e0000;
  height: 150px;
  width: 200px;
  cursor: pointer;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 70px;
}

button:hover {
  background-color: #e0a606; /* Green */
  color: white;
}



.addnew{
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  background-color: #001f38;
  height: 300px;
  margin-left: 50px;
  margin-right: 50px;
  text-decoration: none;
}




</style>
