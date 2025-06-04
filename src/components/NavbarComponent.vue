<template>
  <nav class="bg-emerald-200 text-black shadow-md py-2">
    <div class="container mx-auto flex flex-col">
      <div class="flex items-center justify-between mb-2 relative">
        <div class="w-full max-w-[200px]">
          <button 
            class="px-4 py-2 hover:bg-emerald-500 rounded flex items-center gap-1 w-full"
            @mouseenter="showCategories = true"
            @mouseleave="showCategories = false">
            <span class="mr-1">☰</span> Categorias
          </button>
        </div>

        <RouterLink 
          to="/" 
          class="absolute left-1/2 transform -translate-x-1/2"
        >
          <img 
            src="/src/assets/logo.png" 
            alt="Logo" 
            class="h-16 object-contain hover:scale-105 transition-transform"
          >
        </RouterLink>

        <div class="flex justify-end w-full max-w-[200px]">
          <RouterLink 
            to="/carrinho" 
            class="bg-white text-black px-3 py-1 rounded-md font-semibold hover:bg-gray-200 text-sm"
          >
            Carrinho 🛒
          </RouterLink>
        </div>
      </div>

      <transition name="fade">
        <div 
          v-show="showCategories"
          class="w-full bg-emerald-200 rounded shadow-lg z-50 p-4"
          @mouseenter="showCategories = true"
          @mouseleave="showCategories = false"
        >
          <div v-if="loading" class="text-center py-4">Carregando categorias...</div>
          
          <div v-else class="grid grid-cols-5 gap-4">
            <RouterLink
              v-for="category in categories"
              :key="category"
              :to="`/category/${category}`"
              class="px-4 py-3 hover:bg-slate-600 rounded-md text-center capitalize border border-slate-600 transition-colors"
              @click="showCategories = false"
            >
              {{ formatCategoryName(category) }}
            </RouterLink>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const showCategories = ref(false);
const categories = ref([]);
const loading = ref(false);

const formatCategoryName = (category) => {
  return category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

onMounted(async () => {
  try {
    loading.value = true;
    const response = await axios.get('https://dummyjson.com/products/category-list');
    categories.value = response.data;
  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
  } finally {
    loading.value = false;
  }
});
</script>