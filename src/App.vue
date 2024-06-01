<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
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

