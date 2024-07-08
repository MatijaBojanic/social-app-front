<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit" class="btn-login">Login</button>
    </form>
    <div class="register-link">
      <a href="/register">Don't have an account? Register here!</a>
    </div>
  </div>
</template>

<script>
import {initializeApp, login} from './axiosService';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        await login(this.email, this.password);
        await this.initializeApp();
        window.Echo.channel('public.social-app.' + this.$root.user.uuid +'.comment')
            .listen('.commentUpdated', (e) => {
              console.log('Event data:', e);
              alert('comment received');
            });
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Login failed:', error.message);
      }
    },
    async initializeApp() {
      try {
        this.$root.user = await initializeApp();
      } catch (error) {
        console.error('Initialization failed:', error.message);
      }
    }
  }
};
</script>



<style scoped>
* {
  box-sizing: border-box; /* Ensures all elements consider padding and border in their width and height */
}

.login-container {
  max-width: 400px;
  margin: 0 auto;
  margin-top: 50px; /* Add top margin to move down the form */
  padding: 20px;
  border: 1px solid #444; /* Darker border */
  border-radius: 5px;
  background-color: #333; /* Dark background */
  color: #fff; /* Light text color for readability */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5); /* Optional: Adds depth with a shadow */
}

h2 {
  margin-top: 0;
  color: #fff; /* Ensuring heading is visible */
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  color: #ccc; /* Lighter label color for contrast */
}

input[type="email"],
input[type="password"] {
  width: 100%; /* Adjust back to 100% width */
  margin: 0; /* Remove margin if no longer necessary */
  padding: 10px;
  font-size: 16px;
  background-color: #555; /* Darker input fields */
  color: #fff; /* Light text color */
  border: 1px solid #666; /* Slightly lighter border for visibility */
  border-radius: 5px;
}

input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #bbb; /* Highlight focus with brighter border */
  outline: none; /* Remove default focus outline */
}

button {
  padding: 10px;
  font-size: 16px;
  background-color: #007bff; /* Keep primary button color */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s; /* Smooth transition for hover effect */
}

button:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

.register-link {
  margin-top: 20px; /* Add some space above the link */
  text-align: center; /* Center the link horizontally */
}

.register-link a {
  color: #0096ff; /* Bright color for visibility and consistency */
  text-decoration: none; /* Optional: removes underline */
}

.register-link a:hover {
  text-decoration: underline; /* Adds underline on hover for user feedback */
}
</style>
