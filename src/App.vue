<template>
  <div id="app">
    <GlobalMenu v-if="showMenu"/>
    <router-view/>
  </div>
</template>

<script>
import GlobalMenu from './components/GlobalMenu';
import {initializeApp} from "@/components/axiosService";
export default {
  components: {
    GlobalMenu
  },
  computed: {
    // This will check the current route and decide whether to show the menu
    showMenu() {
      return this.$route.name !== 'login'; // Assuming the route name for the login page is 'login'
    }
  },
  async mounted() {
    try {
      this.$root.user = await initializeApp(this.$router);
    } catch (error) {
      if( this.$route.name !== 'Login'
          && this.$route.name !== 'login'
          && this.$route.name !== 'RegisterPage'
          && this.$route.name !== 'register'
      ) {
        this.$router.push('/login');
      }
    }
  }
}
</script>


<style>
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #121212; /* Dark background for the entire page */
  color: #e0e0e0; /* Lighter text color for readability */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#snackbar {
  visibility: hidden;
  min-width: 250px;
  background-color: #5cb85c;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  right: 20px;
  top: 20px;
  font-size: 17px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {top: 0; opacity: 0;}
  to {top: 20px; opacity: 1;}
}

@keyframes fadein {
  from {top: 0; opacity: 0;}
  to {top: 20px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {top: 20px; opacity: 1;}
  to {top: 0; opacity: 0;}
}

@keyframes fadeout {
  from {top: 20px; opacity: 1;}
  to {top: 0; opacity: 0;}
}

</style>

