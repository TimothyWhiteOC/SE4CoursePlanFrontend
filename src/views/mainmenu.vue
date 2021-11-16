<template>
 
      <div class ="topMenu">Main Menu</div>
          <div>

      <br><br><br>
      <GoogleLogin />
        
    </div>
</template>


<script>
//import DropDownMenu from '../components/DropDownMenu.vue'
import GoogleLogin from '@/components/GoogleLogin'


export default {
    name: 'login',

  components: {/*DropDownMenu,*/ GoogleLogin},
  data() {
    return {
      active: false
    };
  },

}

</script>




