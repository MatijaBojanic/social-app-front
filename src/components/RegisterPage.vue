<template>
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="register" class="register-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required autocomplete="email">
        <span class="error-message">{{ unpackErrors(errors.email) }}</span>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required autocomplete="password">
        <span class="error-message">{{ unpackErrors(errors.password)}}</span>
      </div>
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
        <span class="error-message">{{ unpackErrors(errors.username) }}</span>
      </div>
      <div class="form-group">
        <label for="first_name">First Name:</label>
        <input type="text" id="first_name" v-model="first_name" required>
        <span class="error-message">{{ unpackErrors(errors.first_name) }}</span>
      </div>
      <div class="form-group">
        <label for="last_name">Last Name:</label>
        <input type="text" id="last_name" v-model="last_name" required>
        <span class="error-message">{{ unpackErrors(errors.last_name) }}</span>
      </div>
      <button type="submit" class="btn-register">Register</button>
    </form>
  </div>
</template>

<script>
import {initializeApp, register} from './axiosService';

export default {
  data() {
    return {
      email: '',
      password: '',
      username: '',
      first_name: '',
      last_name: '',
      errors: {} // Object to store validation errors
    };
  },
  methods: {
    async register() {
      try {
        await register(this.email, this.password, this.username, this.first_name, this.last_name);
        // If registration is successful, clear errors and do other actions
        this.errors = {};
        await this.initializeApp();
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Registration failed:', error.message);
        // If registration fails due to validation errors, handle the errors
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors;
        }
      }
    },
    unpackErrors(errorsArray) {
      if (errorsArray && errorsArray.length > 0) {
        // Concatinate the error array entries into a single string, by joining them with a new line and starting
        // with a bullet point
        return errorsArray.map(error => `• ${error}`).join('\n');
      }
      return '';
    },
    async initializeApp() {
      try {
        this.$root.user = await initializeApp(this.$router);
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

.register-container {
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

.register-form {
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
input[type="password"],
input[type="text"]{
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
input[type="password"]:focus,
input[type="text"]:focus{
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

 .error-message {
   color: #cc3333;
   font-size: 14px;
 }
</style>
