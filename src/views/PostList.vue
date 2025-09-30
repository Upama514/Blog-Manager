<!-- src/views/PostList.vue -->
<script setup>
import { ref, onMounted } from 'vue';
import { getPosts, deletePost } from '@/api';
import Postcard from '@/components/Postcard.vue';

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchPosts = async () => {
  try {
    loading.value = true;
    error.value = null;
    const res = await getPosts();
    // Take only first 12 posts for better display
    console.log(res);
    posts.value = res.data.slice(0, 12);
  } catch (err) {
    error.value = 'Failed to load posts. Please try again.';
    console.error('Error fetching posts:', err);
  } finally {
    loading.value = false;
  }
};

const removePost = async (id) => {
  try {
    await deletePost(id);
    posts.value = posts.value.filter(post => post.id !== id);
  } catch (err) {
    alert('Error deleting post. Please try again.');
    console.error('Error deleting post:', err);
  }
};

onMounted(fetchPosts);
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4 max-w-7xl">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Blog Posts</h1>
          <p class="text-gray-600 mt-2">Manage your blog posts efficiently</p>
        </div>
        <router-link 
          to="/create" 
          class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Create New Post
        </router-link>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button 
          @click="fetchPosts" 
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Try Again
        </button>
      </div>

      <!-- Posts Grid -->
      <div v-else-if="posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Postcard 
          v-for="post in posts" 
          :key="post.id" 
          :post="post" 
          @delete="removePost"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <p class="text-gray-600 text-lg mb-4">No posts found.</p>
        <router-link 
          to="/create" 
          class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium"
        >
          Create Your First Post
        </router-link>
      </div>
    </div>
  </div>
</template>