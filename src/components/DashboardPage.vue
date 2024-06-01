<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <nav class="dashboard-menu">
        <ul>
          <li><router-link to="/home">Home</router-link></li>
          <li><router-link to="/profile">Profile</router-link></li>
          <li><router-link to="/settings">Settings</router-link></li>
        </ul>
        <button @click="logout" class="logout-button">Logout</button>
      </nav>
    </header>
    <main class="dashboard-content">
      <h1>This is the Dashboard</h1>
    </main>
  </div>
</template>

<script>
export default {
  name: 'DashboardPage',
  methods: {
    logout() {
      // Perform logout logic, e.g., clearing token, redirecting
      localStorage.removeItem('token');
      this.$router.replace('/login'); // Redirect to login after logout
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

.dashboard-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #121212; /* Dark background for the container */
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

.dashboard-content {
  flex: 1;
  padding: 2rem;
  color: #e0e0e0; /* Ensuring text inside content is also light colored */
}
</style>

