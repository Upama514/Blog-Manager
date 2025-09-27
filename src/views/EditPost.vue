<!-- src/views/EditPost.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getPost, updatePost } from "@/api.js";

const router = useRouter();
const route = useRoute();
const title = ref("");
const body = ref("");
const loading = ref(false);
const error = ref("");
const fetching = ref(true);

const fetchPost = async () => {
  try {
    fetching.value = true;
    const response = await getPost(route.params.id);
    title.value = response.data.title;
    body.value = response.data.body;
  } catch (err) {
    error.value = "Failed to load post. Please try again.";
    console.error("Error fetching post:", err);
  } finally {
    fetching.value = false;
  }
};

const updatePostHandler = async () => {
  // Validation
  if (!title.value.trim() || !body.value.trim()) {
    error.value = "Please fill in both title and body.";
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    await updatePost(route.params.id, { 
      title: title.value.trim(), 
      body: body.value.trim(),
      userId: 1 
    });
    router.push("/");
  } catch (err) {
    error.value = "Failed to update post. Please try again.";
    console.error("Error updating post:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPost();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4 max-w-2xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Edit Post</h1>
        <p class="text-gray-600 mt-2">Update your post content</p>
      </div>

      <!-- Loading State for Fetching -->
      <div v-if="fetching" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>

      <!-- Form -->
      <form v-else @submit.prevent="updatePostHandler" class="bg-white rounded-lg shadow-md p-6">
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
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            :disabled="loading"
          >
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
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
            :disabled="loading"
          ></textarea>
        </div>

        <!-- Buttons -->
        <div class="flex gap-4">
          <button
            type="submit"
            :disabled="loading"
            class="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            <span v-if="loading">Updating...</span>
            <span v-else>Update Post</span>
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