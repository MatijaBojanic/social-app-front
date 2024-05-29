import Vue from 'vue';
import App from './App.vue';
import router from './router';  // Ensure this points to your router configuration file

new Vue({
  router,  // Add the router to the Vue instance
  render: h => h(App),
}).$mount('#app');
