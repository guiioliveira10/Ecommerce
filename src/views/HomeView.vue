<script setup>
import { ref } from 'vue';
import ProductList from '../views/ProductList.vue';

const searchTerm = ref('');
</script>

<template>
  <main class="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 to-white">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <ProductList :searchTerm="searchTerm" />
    </div>
  </main>
</template>