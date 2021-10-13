import {createRouter, createWebHistory} from 'vue-router'
import listPage from '../views/listPage.vue'
import listEntryPage from '../views/listEntryPage.vue'
import mainmenu from '../views/mainmenu.vue'

const routes = [
  {
    path: '/',
    name: 'menu',
    component: mainmenu
  },
  {
    path: '/add',
    name: 'add',
    component: listEntryPage
  },
  {
    path: '/edit/:courseNo',
    name: 'edit',
    props: true,
    component: listEntryPage
  },
  {
    path: '/listPage',
    name: 'listPage',
    component: listPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router