<template>
  <div class="container mx-auto mt-4">
    <div class="text-center mb-8">
    <h1 class="text-3xl font-bold">{{ formattedCategory }}</h1>
    </div>

    <div v-if="loading" class="text-center py-8">
      Carregando produtos...
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        v-for="product in products" 
        :key="product.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <img 
          :src="product.thumbnail" 
          :alt="product.title"
          class="w-full h-48 object-cover"
        >
        <div class="p-4">
          <h3 class="font-semibold text-lg mb-2">{{ product.title }}</h3>
          <p class="text-gray-600 mb-2">R$ {{ product.price }}</p>
          <RouterLink 
            :to="{ name: 'ProductDetails', params: { id: product.id } }"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mr-2"
          >
            Ver detalhes
          </RouterLink>
          <button 
            class="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition-colors"
            @click="addToCart(product)"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const products = ref([]);
const loading = ref(false);

const formattedCategory = computed(() => {
  return route.params.category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
});

onMounted(async () => {
  try {
    loading.value = true;
    const response = await axios.get(`https://dummyjson.com/products/category/${route.params.category}`);
    products.value = response.data.products;
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  } finally {
    loading.value = false;
  }
});

const addToCart = (product) => {
  console.log('Produto adicionado:', product);
};
</script>