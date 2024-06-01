<template>
  <div class="dashboard-container">
    <main class="dashboard-content">
      <h1>See what is happening</h1>
        <button @click="createPost" class="create-post-button">Create New Post</button>
      <div v-if="posts.length">
        <div class="post" v-for="post in posts" :key="post.id">
          <!-- Make the post title clickable -->
          <h3><router-link :to="{ name: 'PostPage', params: { id: post.id }}">{{ post.title }}</router-link></h3>
          <p>{{ post.body }}</p>
          <small>Posted by: {{ post.user.username }} on {{ new Date(post.created_at).toLocaleDateString() }}</small>
        </div>
        <!-- Pagination Controls -->
        <div class="pagination">
          <button @click="fetchPosts(currentPage - 1)" :disabled="!prevPageUrl">Previous</button>
          <span>Page {{ currentPage }} of {{ lastPage }}</span>
          <button @click="fetchPosts(currentPage + 1)" :disabled="!nextPageUrl">Next</button>
        </div>
      </div>
      <div v-else>
        <p>Oops, no posts available</p>
      </div>
    </main>
  </div>
</template>

<script>
import {logout as logoutCall, posts as postsCall} from "@/components/axiosService";

export default {
  name: 'DashboardPage',
  data() {
    return {
      posts: [],
      currentPage: 1,
      lastPage: 1,
      nextPageUrl: null,
      prevPageUrl: null,
    };
  },
  mounted() {
    this.fetchPosts(this.currentPage);
  },
  methods: {
    async fetchPosts(page) {
      try {
        const response = await postsCall(page);
        this.posts = response.data;
        this.currentPage = response.current_page;
        this.lastPage = response.last_page;
        this.nextPageUrl = response.next_page_url;
        this.prevPageUrl = response.prev_page_url;
      } catch (error) {
        console.error('Error fetching posts:', error);
        this.posts = [];
      }
    },
    async logout() {
      await logoutCall();
      this.$router.replace('/login');
    },
    createPost() {
      // Route to the page or modal to create a new post
      this.$router.push({ name: 'CreatePost' });
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

.post {
  background: #333;
  color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.post h3 a {
  color: #ffffff; /* White color for better visibility */
  text-decoration: none; /* Removes underline */
}

.post h3 a:hover {
  color: #cccccc; /* Light grey for hover effect */
  text-decoration: underline; /* Optional: Adds an underline on hover to highlight the link */
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  background-color: #666;
  color: white;
  border: none;
  cursor: pointer;
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: default;
}
.create-post-button {
  padding: 10px 20px;
  background-color: #4CAF50; /* Green background for visibility */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px; /* Space before the post list starts */
}

.create-post-button:hover {
  background-color: #45a049; /* Slightly darker green for hover effect */
}
</style>

