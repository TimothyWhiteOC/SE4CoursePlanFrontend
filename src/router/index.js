import {createRouter, createWebHistory} from 'vue-router'
import adminmenu from '../views/adminmenu.vue'
import courseEditEntry from '../views/courseEditEntry.vue'
import studentEditEntry from '../views/studentEditEntry.vue'
import advisorEditEntry from '../views/advisorEditEntry.vue'
import listCourses from '../views/listCourses.vue'
import listStudents from '../views/listStudents.vue'
import listAdvisors from '../views/listAdvisors.vue'

const routes = [
  {
    path: '/adminmenu',

    name: 'adminmenu',
    component: adminmenu
  },
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router