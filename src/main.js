import Vue from 'vue';
import App from './App.vue';
import router from './router';  // Ensure this points to your router configuration file

new Vue({
  router,  // Add the router to the Vue instance
  data:{
    user: null // This will hold the user data
  },
  render: h => h(App),
}).$mount('#app');
