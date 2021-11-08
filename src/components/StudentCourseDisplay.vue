<template>


  <div class="courseDisp">
    <br>
    {{course.name}}    Course No. {{course.courseNo}}   {{course.hours}} Hours     Grade: {{course.grade}}
    <br>

       <button @click='deleteCourse(course.courseNo)'>Delete</button>


  </div>
    



</template>

<script>
export default {
  name: 'StudentCourseDisplay',
  props: {
    course: Object
  },
  methods: {

    toggle () {
        this.active = !this.active},
        sendForm (){
      if(!this.isEdit) this.addCourseToStudent();
      else this.addCourseToStudent();
    },    
    deleteCourse(courseNum){
      this.$emit('courseDeleted', courseNum)
    } }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
  size: 20px;
}
ul {
  list-style-type: none;
  padding: 0px;
}
li {
  display: inline-block;
  margin: 0 10px;
  
}
a {
  text-decoration: none;
  
  }
.edit{
  border: none;
  padding: 0!important;
  font-family: arial;
  font-size: 17px;
  color: #ffc400;
  background-color: #6e000098;
  height: 40px;
  width: 70px;
    cursor: pointer;
}
.courseDisp {
 /* padding: 10px; */
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 100px;
  margin-right: 100px;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
  font-weight: normal;
  
  background-color: rgba(143, 11, 11, 0.856);
}

button {
  border: none;
  padding: 0!important;
  /*optional*/
  font-family: arial;
  font-size: 17px;
  color: #ffffff;
  background-color: #6e0000;
  height: 30px;
  width: 70px;
  cursor: pointer;
  margin-left: 10px;
}


button:hover {
  background-color: #e0a606; /* Green */
  color: white;
}
/*https://stackoverflow.com/questions/1367409/how-to-make-button-look-like-a-link*/
</style>






