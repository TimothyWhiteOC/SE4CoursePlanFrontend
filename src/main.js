import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import GoogleAuth from 'vue3-google-oauth2'
const gauthOption = {
  clientId: '263273650927-8hg4d3stccism1g1jq5372e0g03ni6du.apps.googleusercontent.com',
  scope: 'email',
  prompt: 'consent'
}

createApp(App).use(router).use(GoogleAuth, gauthOption).mount('#app')
