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
      <div class="form-group">
        <label for="postImage">Image</label>
        <div class="file-upload-wrapper">
          <button type="button" class="file-upload-button" @click="triggerFileUpload">Choose File</button>
          <input type="text" readonly class="file-upload-input" :value="fileName" placeholder="No file chosen">
          <input type="file" id="postImage" @change="handleFileUpload" accept="image/*" ref="fileInput" style="display: none;">
        </div>
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
      postBody: '',
      postImage: null, // Holds the file object
      fileName: ''
    };
  },
  methods: {
    triggerFileUpload() {
      this.$refs.fileInput.click(); // Trigger the hidden file input
    },
    handleFileUpload(event) {
      this.postImage = event.target.files[0]; // Get the first file
      if (this.postImage) {
        this.fileName = this.postImage.name; // Update the file name which will be displayed in the text input
      }
    },
    async submitPost() {
      if (!this.postTitle.trim() || !this.postBody.trim()) {
        alert('Both title and body are required!');
        return;
      }

      // Create FormData object
      const formData = new FormData();
      formData.append('title', this.postTitle);
      formData.append('body', this.postBody);
      if (this.postImage) {
        formData.append('image', this.postImage, this.postImage.name);
      }

      try {
        await createPostCall(formData);
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

.file-upload-wrapper {
  display: flex;
  align-items: center;
}

.file-upload-button {
  padding: 10px 20px;
  background-color: #666; /* Darker grey button */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.file-upload-button:hover {
  background-color: #555;
}

.file-upload-input {
  flex-grow: 1;
  margin-left: 10px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #555;
  background-color: #222;
  color: #ddd;
}
</style>

