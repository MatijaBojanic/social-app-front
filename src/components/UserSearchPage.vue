<template>
  <div class="user-search-page">
    <h1>User Search Page</h1>
    <div class="search-bar">
      <input type="text" v-model="newQuery" @keyup.enter="searchUsers" placeholder="Search users...">
      <button @click="searchUsers">Search</button>
    </div>
    <p class="search-query">Showing results for: {{ currentQuery }}</p>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="users.length === 0" class="no-results">No users found.</div>
    <div v-else class="user-list">
      <h2>Users:</h2>
      <ul>
        <li v-for="user in users" :key="user.id" class="user-item">
          <div class="user-box">
            <h3><router-link :to="`/user/${user.id}`" >{{ user.username }}</router-link></h3>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { searchUsers } from './axiosService';

export default {
  props: {
    query: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      users: [],
      currentQuery: this.query, // Track the current search query
      newQuery: '' // Track the new search query
    };
  },
  async created() {
    this.loading = true;
    try {
      this.users = await searchUsers(this.query);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async searchUsers() {
      this.loading = true;
      try {
        // Use the new query if provided, otherwise use the existing query
        const query = this.newQuery.trim() !== '' ? this.newQuery : this.query;
        this.users = await searchUsers(query);
        this.currentQuery = this.newQuery;
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.user-search-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  color: #fff; /* Font color for dark background */
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar input[type="text"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

.search-bar button {
  padding: 8px 16px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #0056b3;
}

.user-list ul {
  list-style-type: none; /* Remove bullet point dots */
  padding: 0;
}

.user-item {
  margin-bottom: 10px; /* Add margin between user items */
}

.user-box {
  border: 1px solid #ccc; /* Add border around each user box */
  border-radius: 4px; /* Add border radius for rounded corners */
  padding: 10px; /* Add padding inside the user box */
  background: #333;
}
.user-item h3 a {
  color: #ffffff; /* White color for better visibility */
  text-decoration: none; /* Removes underline */
}

.user-item h3 a:hover {
  color: #cccccc; /* Light grey for hover effect */
  text-decoration: underline; /* Optional: Adds an underline on hover to highlight the link */
}
</style>
