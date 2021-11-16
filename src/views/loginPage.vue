<template>
  <div>
    <div class ="topMenu">Home Page</div>
    <div class="main-container">
      <GoogleLogin />
    </div>
  </div>
</template>

<script>
import GoogleLogin from '@/components/GoogleLogin'
export default {
  name: 'login',
  components: {
    GoogleLogin
  }
}
</script>