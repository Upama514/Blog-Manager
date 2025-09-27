<!-- src/components/Postcard.vue -->
<script setup>
import { RouterLink } from "vue-router";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  post: Object
});

const emit = defineEmits(["delete"]);

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this post?')) {
    emit("delete", props.post.id);
  }
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100">
    <h2 class="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{{ post.title }}</h2>
    <p class="text-gray-600 mb-4 line-clamp-3">{{ post.body }}</p>
    <div class="flex justify-between items-center pt-4 border-t border-gray-100">
      <span class="text-sm text-gray-500">Post ID: {{ post.id }}</span>
      <div class="flex gap-3">
        <RouterLink
          :to="`/edit/${post.id}`"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
        >
          Edit
        </RouterLink>
        <button 
          @click="handleDelete" 
          class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>