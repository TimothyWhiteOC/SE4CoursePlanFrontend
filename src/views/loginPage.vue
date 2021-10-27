<template>
  <div class="main-container">
    <form>
        <GoogleLogin />
    </form>
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