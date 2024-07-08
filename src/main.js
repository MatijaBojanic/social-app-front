import Vue from 'vue';
import App from './App.vue';
import router from './router';  // Ensure this points to your router configuration file

import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.VUE_APP_PUSHER_APP_KEY,
  wsHost: process.env.VUE_APP_PUSHER_HOST,
  wsPort: 6001,
  cluster: "mt1",
  forceTLS: false,
  disableStats: true
});

new Vue({
  router,  // Add the router to the Vue instance
  data:{
    user: null // This will hold the user data
  },
  render: h => h(App),
}).$mount('#app');
