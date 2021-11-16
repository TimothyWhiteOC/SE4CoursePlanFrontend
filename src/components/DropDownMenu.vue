<template>
    <div class="dropdown">
      <button class="dropbtn" onclick="this.classList.toggle('opened');this.setAttribute('aria-expanded', this.classList.contains('opened'))" aria-label="Main Menu" @click="toggle">
        <svg width="100" height="100" >
          <path class="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
          <path class="line line2" d="M 20,50 H 80" />
          <path class="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
        </svg>  
      </button>

      <div v-if="active">
        <div class="dropdown-content">
          <a v-for="link in activeLinks" :key="link.link">
            <router-link :to="{ name: link.link, params: link.params }">{{link.displayText}}</router-link></a>
        </div>
      </div>
    </div>
    <!--<h2 class = "title">{{this.pageName}}</h2>-->
</template>

<script>
import { getStore } from "@/store/store"

export default {
  name: 'DropDownMenu',
  props: {
    pageName: String
    //pageType: String? Might be needed later
  },
  data () {
    return {
      user: getStore('user') || {role: 'none'},
      active: false,
      activeLinks: [],
      allLinksByRole: [
        {
          link: 'login',
          displayText: 'Home',
          roles: ['admin', 'advisor', 'student', 'none']
        },
        {
          link: 'listCourses',
          displayText: 'Search for Course',
          roles: ['admin', 'advisor', 'student', 'none']
        },
        {
          link: 'courseAdd',
          displayText: 'Add New Course',
          roles: ['admin', 'advisor']
        },
        {
          link: 'coursePlan',
          params: {studentID: getStore('user') && getStore('user').id ? getStore('user').id : 0},
          displayText: 'View Course plan',
          roles: ['student']
        },
        {
          link: 'listStudents',
          displayText: 'Search for Students',
          roles: ['admin', 'advisor']
        },
        {
          link: 'studentAdd',
          displayText: 'Add New Student',
          roles: ['admin', 'advisor']
        },
        {
          link: 'listAdvisors',
          displayText: 'Search for Advisors',
          roles: ['admin', 'advisor']
        },
        {
          link: 'advisorAdd',
          displayText: 'Add New Advisor',
          roles: ['admin']
        }
      ]
    }
  },
  created() {
    this.activeLinks = this.allLinksByRole.filter((link) => link.roles.includes(this.user.role) || link.roles.includes("none"));
  },
  methods: {
    toggle () {
      this.active = !this.active
    }
  },
  computed: {
    getStudentID() {
      return {studentID: this.user.id || 0};
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.menu {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-top: -10px;
}
.line {
  fill: none;
  stroke: rgb(255, 255, 255);
  stroke-width: 3;
  transition: stroke-dasharray 6ms cubic-bezier(0.4, 0, 0.2, 1),
    stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

.line:hover {
  background-color: #ffffff; /* Green */
  color: rgb(0, 0, 0);

}
.line1 {
  stroke-dasharray: 60 207;
  stroke-width: 3;
}
.line2 {
  stroke-dasharray: 60 60;
  stroke-width: 3;
}
.line3 {
  stroke-dasharray: 60 207;
  stroke-width: 3;
}
.opened .line1 {
  stroke-dasharray: 90 207;
  stroke-dashoffset: -134;
  stroke-width: 3;
}
.opened .line2 {
  stroke-dasharray: 1 60;
  stroke-dashoffset: -30;
  stroke-width: 3;
}
.opened .line3 {
  stroke-dasharray: 90 207;
  stroke-dashoffset: -134;
  stroke-width: 3;
}
</style>






