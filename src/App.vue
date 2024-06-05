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
    console.log("testtttt");
    try {
      this.$root.user = await initializeApp();
    } catch (error) {
      console.error('Initialization failed:', error.message);
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
</style>

