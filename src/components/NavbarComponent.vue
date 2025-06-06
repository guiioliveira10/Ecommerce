<template>
  <nav class="bg-emerald-200 text-black shadow-md py-2">
    <div class="container mx-auto">
      <div class="flex items-center justify-between">
        <div class="w-1/4">
          <button class="px-4 py-2 hover:bg-emerald-500 rounded flex items-center gap-1" @click="toggleCategories">
            <span>Categorias</span>
          </button>

        </div>
        <RouterLink to="/">
          <img src="/src/assets/logo.png" alt="Logo" class="h-16 hover:scale-105 transition-transform">
        </RouterLink>
        <div class="w-1/4 text-right">
          <RouterLink to="/carrinho" class="bg-white px-3 py-1 rounded-md font-semibold hover:bg-gray-200">
            Carrinho
          </RouterLink>
        </div>
      </div>

      <div 
        v-show="showCategories"
        class="w-full bg-emerald-200 rounded shadow-lg p-4 mt-2">
        <div v-if="loading">Carregando...</div>
        <div v-else class="flex flex-wrap gap-2">
          <RouterLink v-for="category in categories"
            :key="category"
            :to="`/category/${category}`"
            class="px-3 py-2 hover:bg-slate-600 rounded-md capitalize border border-slate-600"
            @click="showCategories = false">
            {{ category.replace('-', ' ') }}
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const showCategories = ref(false);
const categories = ref([]);
const loading = ref(true);

const toggleCategories = () => {
  showCategories.value = !showCategories.value;
};

onMounted(async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products/category-list');
    categories.value = response.data;
  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
  } finally {
    loading.value = false;
  }
});
</script>