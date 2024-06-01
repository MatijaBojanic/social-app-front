<template>
  <div class="create-post-page">
    <h1>Create New Post</h1>
    <form @submit.prevent="submitPost">
      <div class="form-group">
        <label for="postTitle">Title</label>
        <input id="postTitle" v-model="postTitle" type="text" placeholder="Enter post title" required>
      </div>
      <div class="form-group">
        <label for="postBody">Body</label>
        <textarea id="postBody" v-model="postBody" placeholder="Write your post content here..." required></textarea>
      </div>
      <button type="submit" class="submit-button">Submit Post</button>
    </form>
  </div>
</template>

<script>
import { createPost as createPostCall } from "@/components/axiosService";

export default {
  name: 'CreatePostPage',
  data() {
    return {
      postTitle: '',
      postBody: ''
    };
  },
  methods: {
    async submitPost() {
      if (!this.postTitle.trim() || !this.postBody.trim()) {
        alert('Both title and body are required!');
        return;
      }
      try {
        await createPostCall(this.postTitle,this.postBody);
        this.$router.push('/dashboard'); // Redirect to the dashboard after successful post creation
      } catch (error) {
        console.error('Failed to create post:', error);
        alert('Failed to submit post.');
      }
    }
  }
};
</script>

<style scoped>
.create-post-page {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #333;
  color: #fff;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  box-sizing: border-box; /* Ensures padding is included in the total width and height */
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #555;
  background-color: #222;
  color: #ddd;
}

.submit-button {
  padding: 10px 20px;
  background-color: #5cb85c; /* Green background for visibility */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.submit-button:hover {
  background-color: #4cae4c;
}
</style>

