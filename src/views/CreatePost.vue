<!-- src/views/CreatePost.vue -->
<script setup>
import { ref } from "vue";
import { createPost } from "@/api.js";
import { useRouter } from "vue-router";

const router = useRouter();
const title = ref("");
const body = ref("");
const loading = ref(false);
const error = ref("");

const submitPost = async () => {
  // Validation
  if (!title.value.trim() || !body.value.trim()) {
    error.value = "Please fill in both title and body.";
    return;
  }

  if (title.value.trim().length < 3) {
    error.value = "Title must be at least 3 characters long.";
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    await createPost({ 
      title: title.value.trim(), 
      body: body.value.trim(),
      userId: 1 // JSONPlaceholder requires this
    });
    router.push("/");
  } catch (err) {
    error.value = "Failed to create post. Please try again.";
    console.error("Error creating post:", err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4 max-w-2xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Create New Post</h1>
        <p class="text-gray-600 mt-2">Share your thoughts with the world</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitPost" class="bg-white rounded-lg shadow-md p-6">
        <!-- Error Message -->
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p class="text-red-600">{{ error }}</p>
        </div>

        <!-- Title Input -->
        <div class="mb-6">
          <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
            Post Title *
          </label>
          <input
            v-model="title"
            type="text"
            id="title"
            placeholder="Enter a compelling title..."
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            :disabled="loading"
          >
          <p class="text-sm text-gray-500 mt-1">{{ title.length }}/100 characters</p>
        </div>

        <!-- Body Textarea -->
        <div class="mb-6">
          <label for="body" class="block text-sm font-medium text-gray-700 mb-2">
            Post Content *
          </label>
          <textarea
            v-model="body"
            id="body"
            rows="8"
            placeholder="Write your post content here..."
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
            :disabled="loading"
          ></textarea>
          <p class="text-sm text-gray-500 mt-1">{{ body.length }}/500 characters</p>
        </div>

        <!-- Buttons -->
        <div class="flex gap-4">
          <button
            type="submit"
            :disabled="loading"
            class="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            <span v-if="loading">Creating...</span>
            <span v-else>Create Post</span>
          </button>
          
          <router-link
            to="/"
            class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium text-center transition-colors"
          >
            Cancel
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>