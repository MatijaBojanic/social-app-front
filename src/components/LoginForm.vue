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
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

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
        // Request the CSRF cookie from Laravel
        await axios.get('http://localhost:80/sanctum/csrf-cookie');
        axios.defaults.withCredentials = true;

        // Proceed to submit login credentials
        const loginResponse = await axios.post('http://localhost:80/login', {
          email: this.email,
          password: this.password
        });

        // Assuming the backend returns a token upon successful login
        const token = loginResponse.data.token;
        localStorage.setItem('token', token);  // Store the token for future requests

        // Fetch initial data after successful login
        await this.initializeApp();

        this.$router.push('/dashboard');  // Redirect to the dashboard
      } catch (error) {
        // Handle login error
        console.error('Login failed:', error.response?.data.message);
      }
    },
    async initializeApp() {
      try {
        const initResponse = await axios.get('http://localhost:80/initialize');
        // Handle the response, e.g., storing it in Vuex or component data
        console.log('Initialization data:', initResponse.data);
      } catch (error) {
        // Handle errors from the initialization request
        console.error('Initialization failed:', error.response?.data.message);
      }
    }
  }
};
</script>



<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

h2 {
  margin-top: 0;
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
}

input[type="email"],
input[type="password"],
button {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[type="email"],
input[type="password"] {
  width: 100%;
}

button {
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
