<template>
<div >
    <router-view/>

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
  color: #000000;
}

label{
  color: #002e74;
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

.topMenu{
  background-color: #004b91;
  height: 85px;
  margin-left: 0px;
  margin-right: 0px;
}

.title{
  background-color: #cccccc34;
  height: 65px;
  margin-right: 0px;
  margin-top: -108px;
  color:rgb(255, 246, 235);
  font-size: 40px;
  padding-top: 25px;
  font-weight: normal;

}

.welcome{
  color:rgb(34, 34, 34);
  position: fixed;
  margin-left: 300px;
}

.form{
  margin-top: 10px;
  color: rgb(0, 0, 0);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  font-weight: normal; 
  width: 650px;
  margin-left: 400px;
  position: absolute;
}

.listDisp {
  margin-top: 30px;
  color: rgb(0, 0, 0);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
  font-weight: normal; 
  width: 650px;
  margin-left: 20%;
  margin-right: 50%;

  min-width: 950px;
  background-color: #16a11b00;

}
.search{
  margin-left: 45%;
  margin-right: 50%;
  color: rgb(0, 0, 0);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 17px;
  font-weight: normal; 
  margin-top: -10px;
}

.dropbtn {
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
  width: 100px;
  height: 100px;  
}

.dropdown {
  position: relative;
  display: inline-block;
  margin-right: 1400px; 
  margin-left: -15px;
}

.dropdown-content {
 /* display: none;*/
  position: absolute;
  background-color: #ffffff;
  min-width: 160px;
  /*box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);*/
  z-index: 1;
}

.dropdown-content a {
  padding: 12px 16px;
  text-decoration: none;
  display: block;
    background-color: rgb(67, 155, 255);
  color:#ffffff;
    font-size: 17px;

}

.dropdown-content a:hover {
  color: rgb(67, 155, 255);
    background-color: #ffffff;
    font-size: 18px;
  }

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #3e8e41;
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

.buttonPrint {
  border-radius: 0px;
  border: none;
  padding: 0!important;
  /*optional*/
  font-family: arial;
  font-size: 17px;
  color: #ffffff;
  background-color: #4385ff98;
  height: 60px;
  width: 80px;
  cursor: pointer;
  margin-left: 10px;
}


</style>
