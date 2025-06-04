<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <button 
      @click="$router.go(-1)"
      class="flex items-center text-blue-500 mb-6 hover:text-blue-700"
    >
      ← Voltar
    </button>

    <div v-if="loading" class="text-center py-12">
      Carregando...
    </div>

    <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <img 
          :src="product.thumbnail" 
          :alt="product.title"
          class="w-full h-64 md:h-96 object-contain p-4"
        >
        <div class="grid grid-cols-4 gap-2 p-4 border-t">
          <img 
            v-for="(image, index) in product.images" 
            :key="index"
            :src="image" 
            @click="currentImage = image"
            class="h-20 object-cover cursor-pointer border rounded hover:border-blue-500"
            :class="{'border-blue-500': currentImage === image}"
          >
        </div>
      </div>

      <div>
        <h1 class="text-2xl font-bold mb-2">{{ product.title }}</h1>
        <div class="flex items-center mb-4">
          <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {{ product.category }}
          </span>
          <span class="ml-2 text-yellow-500">★ {{ product.rating }}</span>
        </div>

        <p class="text-3xl font-bold mb-4">${{ product.price }}</p>
        <p class="text-gray-700 mb-6">{{ product.description }}</p>

        <div class="mb-6">
          <h3 class="font-semibold mb-2">Especificações:</h3>
          <ul class="list-disc pl-5 space-y-1">
            <li>Marca: {{ product.brand || 'Não informado' }}</li>
            <li>Estoque: {{ product.stock }} unidades</li>
            <li>Desconto: {{ product.discountPercentage }}%</li>
          </ul>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      Produto não encontrado
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { inject } from 'vue'

const route = useRoute()
const product = ref(null)
const loading = ref(true)
const currentImage = ref('')
const { addToCart } = inject('cart')

onMounted(async () => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${route.params.id}`)
    const data = await response.json()
    product.value = data
    currentImage.value = data.thumbnail
  } catch (error) {
    console.error('Erro ao carregar produto:', error)
  } finally {
    loading.value = false
  }
})
</script>