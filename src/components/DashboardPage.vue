<template>
  <div class="dashboard-container">
    <main class="dashboard-content">
      <h1>See what is happening</h1>
        <button @click="createPost" class="create-post-button">Create New Post</button>
      <div v-if="posts.length">
        <div class="post" v-for="post in posts" :key="post.id">
          <!-- Make the post title clickable -->
          <h3><router-link :to="{ name: 'PostPage', params: { id: post.id }}">{{ post.title }}</router-link></h3>
            <img v-if="post.image_path" :src="getImageUrl(post)" alt="Post Image">
          <p>{{ post.body }}</p>
          <small>Posted by: <router-link :to="`/user/${post.user.id}`" >{{ post.user.username }}</router-link> on {{ new Date(post.created_at).toLocaleDateString() }}</small>
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
    getImageUrl(post) {
      return post.image_path ? `${process.env.VUE_APP_API_URL}/storage/${post.image_path}` : '/default-image.png';
    },
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

.post a {
  color: #ffffff; /* White color for better visibility */
  text-decoration: none; /* Removes underline */
}

.post a:hover {
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

img {
  max-width: 100%;
  height: auto;
}
</style>

