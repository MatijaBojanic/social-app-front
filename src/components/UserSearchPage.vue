
<template>
  <div>
    <h1>User Search Page</h1>
    <p>Search query: {{ query }}</p>
    <div v-if="loading">Loading...</div>
    <div v-else-if="users.length === 0">No users found.</div>
    <div v-else>
      <h2>Users:</h2>
      <ul>
        <li v-for="user in users" :key="user.id">{{ user.username }}</li>
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
      users: []
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
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
