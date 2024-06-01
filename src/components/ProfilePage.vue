<template>
  <div class="profile-container">
    <header class="profile-box">
      <div class="profile-header">
        <h1>{{ user?.username }}</h1>
        <button v-if="$root.user.id !== this.user.id" @click="toggleFollow" class="follow-button">
          {{ isFollowing ? 'Unfollow' : 'Follow' }}
        </button>
      </div>
      <hr class="section-separator">
    </header>
  <div class="dashboard-container">
    <main class="dashboard-content">
      <div v-if="posts.length">
        <div class="post" v-for="post in posts" :key="post.id">
          <h3><router-link :to="{ name: 'PostPage', params: { id: post.id }}">{{ post.title }}</router-link></h3>
          <p>{{ post.body }}</p>
          <small>Posted on {{ new Date(post.created_at).toLocaleDateString() }}</small>
        </div>
        <div class="pagination">
          <button @click="fetchPosts(currentPage - 1)" :disabled="!prevPageUrl">Previous</button>
          <span>Page {{ currentPage }} of {{ lastPage }}</span>
          <button @click="fetchPosts(currentPage + 1)" :disabled="!nextPageUrl">Next</button>
        </div>
      </div>
      <div v-else>
        <p>Oops, no posts available.</p>
      </div>
    </main>
  </div>
  </div>

</template>

<script>
import {getUserDetails, posts, toggleFollow} from "@/components/axiosService";

export default {
  name: 'ProfilePage',
  data() {
    return {
      user: null,
      posts: [],
      currentPage: 1,
      lastPage: 1,
      nextPageUrl: null,
      prevPageUrl: null,
      isFollowing: false,
    };
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      const userId = this.$route.params.id;

      console.log("USER ID:" + userId);

      // Fetch user details and posts
      const userDetails = await getUserDetails(userId);
      console.log(userDetails);

      this.user = userDetails;
      this.isFollowing = userDetails.isFollowing;

      this.fetchPosts(this.currentPage);
    },
    async fetchPosts(page) {
      const userId = this.$route.params.id;

      console.log("USER ID::::::" + userId);

      const response = await posts(page, userId);
      console.log(response);
      this.posts = response.data;
      this.currentPage = response.current_page;
      this.lastPage = response.last_page;
      this.nextPageUrl = response.next_page_url;
      this.prevPageUrl = response.prev_page_url;
    },
    async toggleFollow() {
      await toggleFollow(this.user.id);
      this.isFollowing = !this.isFollowing;
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

.section-separator {
  border: 0;
  height: 1px;
  background: #555; /* Lighter or darker depending on your design */
  margin: 20px 0; /* Provides spacing around the separator */
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

.profile-container {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #121212;
  color: #fff;
  border-radius: 8px;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  background: #333;
  padding: 10px 20px;
}



.follow-button {
  padding: 8px 16px;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.follow-button:hover {
  background-color: #4cae4c;
}

.profile-content h2 {
  margin-bottom: 15px;
}
</style>
