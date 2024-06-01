<template>
  <div class="post-page" v-if="post">
    <!-- Back Button -->
    <button @click="goBack" class="back-button">← Back</button>
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
    <div class="post-user" v-if="post.user">
      Posted by: {{ post.user.username }}
    </div>
    <hr class="section-separator">
    <h2>Comments</h2>
    <form @submit.prevent="submitComment" class="comment-form">
      <textarea v-model="newComment" placeholder="Write a comment..." required class="comment-textarea"></textarea>
      <button type="submit" class="comment-button">Post Comment</button>
    </form>
    <!-- Comments Section -->
    <div class="post-comments">
      <div v-if="post.comments && post.comments.length">
        <div v-for="comment in post.comments" :key="comment.id" class="comment-section">
          <div v-if="comment.user">
            <h3>{{ comment.user.username }}</h3>
            <p>{{ comment.body }}</p>
          </div>
        </div>
      </div>
      <p v-else>No comments available.</p>
    </div>
  </div>
  <div v-else>
    <p>Loading post or post does not exist...</p>
  </div>
</template>

<script>
import {post as showPost, createComment} from "@/components/axiosService";

export default {
  name: 'PostPage',
  data() {
    return {
      post: null,
      newComment: ''  // Data model for the new comment input
    };
  },
  created() {
    this.fetchPost();
  },
  methods: {
    async fetchPost() {
      try {
        const postId = this.$route.params.id;
        this.post = await showPost(postId);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      }
    },
    async submitComment() {
      if (!this.newComment.trim()) return;  // Prevents submitting empty comments
      try {
        const response = await createComment(this.post.id, this.newComment);
        this.post.comments.unshift(response);
        this.newComment = '';
      } catch (error) {
        console.error('Failed to post comment:', error);
      }
    },
    goBack() {
      this.$router.go(-1); // or this.$router.back();
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.post-page {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #333;
  color: #fff;
  border-radius: 8px;
}

.post-user, .post-comments {
  margin-top: 20px;
}

.section-separator {
  border: 0;
  height: 1px;
  background: #555; /* Lighter or darker depending on your design */
  margin: 20px 0; /* Provides spacing around the separator */
}

.comment-form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.comment-textarea {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #222;
  color: #ddd;
  border: 2px solid #555;
  border-radius: 4px;
  resize: none;
}

.comment-button {
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 25%;
  align-self: center;
}

.comment-button:hover {
  background-color: #4cae4c;
}

.comment-section {
  background: #424242;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
}

.comment-section h3 {
  margin: 0;
  color: #ade8f4;
}

.comment-section p {
  margin-top: 5px;
}

.back-button {
  padding: 8px 16px;
  margin: 10px 0;
  background-color: #666;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #555;
}
</style>
