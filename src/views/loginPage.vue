<template>
  <div class="main-container">
    <GoogleLogin />
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