<template>
  <div class="post-page" v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
    <div class="post-user" v-if="post.user">
      Posted by: {{ post.user.username }}
    </div>
    <div class="post-comments">
      <h2>Comments</h2>
      <template v-if="post.comments && post.comments.length">
        <div v-for="comment in post.comments" :key="comment.id" class="comment-section">
          <div v-if="comment.user"> <!-- Separate the v-if -->
            <h3>{{ comment.user.username }}</h3>
            <p>{{ comment.body }}</p>
          </div>
        </div>
      </template>
      <p v-else>No comments available.</p>
    </div>
  </div>
  <div v-else>
    <p>Loading post or post does not exist...</p>
  </div>
</template>




<script>
import {post as showPost} from "@/components/axiosService";

export default {
  name: 'PostPage',
  data() {
    return {
      post: null
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
    }
  }
};
</script>

<style scoped>
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

.comment-section {
  background: #424242;  /* Slightly lighter or darker than the post background for contrast */
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
}

.comment-section h3 {
  margin: 0;  /* Removes default margin to compact the header */
  color: #ade8f4;  /* Light blue for username to make it stand out */
}

.comment-section p {
  margin-top: 5px;
}
</style>

