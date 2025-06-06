<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6 text-center">{{ categoryName }}</h1>
    
    <div v-if="loading" class="text-center py-8">Carregando...</div>
    
    <div v-else class="flex flex-wrap gap-4 justify-center">
      <div v-for="product in products" :key="product.id" class="bg-white shadow rounded-lg w-64 p-4">
        <img :src="product.thumbnail" :alt="product.title" class="w-full h-40 object-contain mb-3">
        <h3 class="font-semibold">{{ product.title }}</h3>
        <p class="text-gray-600 my-2">R$ {{ product.price }}</p>
        
        <div class="flex justify-between mt-auto pt-2 space-x-2">
          <router-link :to="`/produto/${product.id}`" class="flex-1 text-center bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors text-sm">
            Detalhes
          </router-link>
          <button @click="addToCart(product)" class="flex-1 bg-emerald-500 text-white px-2 py-1 rounded hover:bg-emerald-600 transition-colors text-sm">
            Adicionar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const props = defineProps({
  category: String
});

const products = ref([]);
const loading = ref(true);

const categoryName = computed(() => {
  const name = props.category.replace('-', ' ');
  return name.charAt(0).toUpperCase() + name.slice(1);
});

onMounted(async () => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/category/${props.category}`);
    products.value = response.data.products;
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  } finally {
    loading.value = false;
  }
});

const addToCart = (product) => {
  console.log('Adicionado:', product);
};
</script>