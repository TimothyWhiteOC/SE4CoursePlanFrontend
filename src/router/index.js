import {createRouter, createWebHistory} from 'vue-router'
//import adminmenu from '../views/adminmenu.vue'
//import studentMenu from '../views/studentMenu.vue'
import courseEditEntry from '../views/courseEditEntry.vue'
import studentEditEntry from '../views/studentEditEntry.vue'
import advisorEditEntry from '../views/advisorEditEntry.vue'
import listCourses from '../views/listCourses.vue'
import listStudents from '../views/listStudents.vue'
import listAdvisors from '../views/listAdvisors.vue'
import coursePlan from '../views/coursePlan.vue'
import studentCourseEditEntry from '../views/studentCourseEditEntry.vue'
import classForStudent from '../views/classForStudent.vue'

import mainmenu from '../views/mainmenu.vue'
import termSelect from '../views/termSelect.vue'


const routes = [
  {
    path: '/courseAdd',
    name: 'courseAdd',
    component: courseEditEntry
  },
  {
    path: '/studentAdd',
    name: 'studentAdd',
    component: studentEditEntry
  },
  {
    path: '/advisorAdd',
    name: 'advisorAdd',
    component: advisorEditEntry
  },
  {
    path: '/editCourse/:courseNo',
    name: 'editCourse',
    props: true,
    component: courseEditEntry
  },
  {
    path: '/editStudent/:studentID',
    name: 'editStudent',
    props: true,
    component: studentEditEntry
  },
  {
    path: '/editAdvisor/:advisorID',
    name: 'editAdvisor',
    props: true,
    component: advisorEditEntry
  },
  {
    path: '/listCourses',
    name: 'listCourses',
    component: listCourses
  },
  {
    path: '/listStudents',
    name: 'listStudents',
    component: listStudents
  },
  {
    path: '/listAdvisors',
    name: 'listAdvisors',
    component: listAdvisors
  },
  {
    path: '/coursePlan/:studentID',
    name: 'coursePlan',
    props: true,
    component: coursePlan
  }, 
  {
    path: '/',
    name: 'mainmenu',
    component: mainmenu
  },
  {
    path: '/termSelect/:studentID',
    name: 'termSelect',
    props: true,
    component: termSelect
  } ,
  {
    path: '/students/:studentID/addCourse/:semTerm/:semYear/',
    name: 'classForStudent',
    props: true,
    component: classForStudent
  },
  {
    path: '/students/:studentID/editCourse/:courseNo',
    name: 'studentCourseEditEntry',
    props: true,
    component: studentCourseEditEntry
  }
]


// https://stackoverflow.com/questions/47591679/multiple-routers-with-vue

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router