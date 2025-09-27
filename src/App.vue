<!-- src/App.vue -->
<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow">
      <RouterView />
    </main>
   <Footer></Footer>
  </div>
</template>

<style>
/* Global styles */
body {
  font-family: 'Inter', sans-serif;
}
</style>