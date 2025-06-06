<template>
  <div class="p-4 max-w-4xl mx-auto">
    <button @click="$router.back()" class="text-blue-500 hover:underline mb-4">
      Voltar
    </button>

    <div v-if="loading" class="text-center py-8">
      Carregando produto...
    </div>

    <div v-else-if="product" class="md:flex gap-6">
      <div class="md:w-1/2 mb-6">
        <img :src="product.thumbnail" :alt="product.title" class="w-full h-64 object-contain border rounded-lg">
        <div class="flex mt-2 gap-2 overflow-x-auto py-2">
          <img v-for="(image, index) in product.images" 
            :key="index"
            :src="image" 
            @click="currentImage = image"
            class="h-16 object-cover border rounded cursor-pointer"
            :class="{'border-blue-500': currentImage === image}">
        </div>
      </div>

      <div class="md:w-1/2">
        <h1 class="text-xl font-bold">{{ product.title }}</h1>
        <p class="text-gray-600 my-2">{{ product.brand }}</p>
        
        <p class="text-2xl font-bold my-3">R$ {{ product.price }}</p>
        
        <div class="flex items-center mb-4">
          <span class="text-yellow-500 mr-1">Avaliação:</span>
          <span>{{ product.rating }}</span>
        </div>

        <p class="text-gray-700 mb-4">{{ product.description }}</p>

        <div class="border-t pt-4">
          <h3 class="font-semibold mb-2">Informações:</h3>
          <ul class="space-y-2">
            <li>Categoria: {{ product.category }}</li>
            <li>Disponível: {{ product.stock }} unidades</li>
          </ul>
        </div>

        <button @click="addToCart(product)" class="mt-6 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Recebe o ID do produto via props
const props = defineProps({
  id: String
});

const product = ref(null);
const loading = ref(true);
const currentImage = ref('');

onMounted(async () => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/${props.id}`);
    product.value = response.data;
    currentImage.value = product.value.thumbnail;
  } catch (error) {
    console.log('Erro ao carregar produto', error);
  } finally {
    loading.value = false;
  }
});

const addToCart = (product) => {
  console.log('Produto adicionado:', product);
};
</script>