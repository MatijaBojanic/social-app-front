<template>
  <header v-if="shouldShowMenu" class="dashboard-header">
    <nav class="dashboard-menu">
      <ul>
        <li><router-link to="/dashboard">Home</router-link></li>
        <li><router-link to="/profile">Profile</router-link></li>
      </ul>
      <button @click="logout" class="logout-button">Logout</button>
    </nav>
  </header>
</template>

<script>
import {logout as logoutCall} from "@/components/axiosService";

export default {
  data() {
    return {
      shouldShowMenu: true,
    };
  },
  created() {
    this.updateVisibility();
    this.$router.beforeEach((to, from, next) => {
      this.updateVisibility(to);
      next();
    });
  },
  methods: {
    updateVisibility(to = this.$route) {
      this.shouldShowMenu = to.name !== 'Login';
    },
    async logout() {
      await logoutCall();
      this.$router.replace('/login');
    }
  }
};
</script>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  background-color: #121212; /* Dark background for the entire page */
  color: #e0e0e0; /* Lighter text color for readability */
}
.dashboard-header {
  padding: 1rem;
  background-color: #333; /* Darker shade for the header */
  box-shadow: 0 2px 4px rgba(255,255,255,0.1); /* Subtle white shadow for depth */
}

.dashboard-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-menu ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.dashboard-menu ul li {
  margin-right: 20px; /* Space between menu items */
}

.dashboard-menu ul li a {
  color: #e0e0e0; /* Lighter text for links */
  text-decoration: none; /* Removes underline */
}

.dashboard-menu ul li a:hover {
  color: #ffffff; /* Bright white on hover for better visibility */
}

.dashboard-menu .logout-button {
  padding: 8px 16px;
  background-color: #d32f2f; /* Red button for contrast */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dashboard-menu .logout-button:hover {
  background-color: #b71c1c; /* Darker red on hover */
}
</style>
