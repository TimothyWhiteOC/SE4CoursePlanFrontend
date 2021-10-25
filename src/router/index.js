import {createRouter, createWebHistory} from 'vue-router'
import listCourses from '../views/listCourses.vue'
import courseEditEntry from '../views/courseEditEntry.vue'
import studentEditEntry from '../views/studentEditEntry.vue'
import adminmenu from '../views/adminmenu.vue'
import listStudents from '../views/listStudents.vue'

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
    path: '/listCourses',
    name: 'listCourses',
    component: listCourses
  },
  {
    path: '/listStudents',
    name: 'listStudents',
    component: listStudents
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router