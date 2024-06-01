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
import { login, initializeApp } from './axiosService';

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
        const data = await login(this.email, this.password);
        localStorage.setItem('token', data.token);  // Assuming token is returned here
        await this.initializeApp();
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Login failed:', error.message);
      }
    },
    async initializeApp() {
      try {
        const initData = await initializeApp();
        console.log('Initialization data:', initData);
      } catch (error) {
        console.error('Initialization failed:', error.message);
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
