<!-- src/components/Navbar.vue -->
<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="bg-white shadow-lg border-b border-gray-200">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <RouterLink to="/" class="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
          BlogManager
        </RouterLink>
        
        <div class="flex gap-6">
          <RouterLink 
            to="/" 
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            active-class="text-blue-600 border-b-2 border-blue-600"
          >
            All Posts
          </RouterLink>
          <RouterLink 
            to="/create" 
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            active-class="text-blue-600 border-b-2 border-blue-600"
          >
            Create Post
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>