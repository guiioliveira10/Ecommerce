<template>
  <div>
    <h2 class="text-2xl font-bold mb-2 flex justify-end">Procura algo específico hoje?</h2>

    <div class="flex justify-end mb-6">
      <div class="w-full md:w-96">
      <input
        type="text"
        placeholder="Buscar produtos..."
        v-model="localSearchTerm"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
      >
        <div class="flex flex-col items-center flex-grow">
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="w-full h-40 object-contain mb-2"
          />
          <h3 class="text-center text-sm font-semibold mb-1">{{ product.title }}</h3>
          <p class="text-sm text-gray-500 capitalize text-center">{{ product.category }}</p>
          <p class="text-base font-bold mt-1">$ {{ product.price }}</p>
        </div>

        <div class="flex justify-between mt-auto pt-2 space-x-2">
          <router-link
            :to="`/produto/${product.id}`"
            class="flex-1 text-center bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors text-sm"
          >
            Detalhes
          </router-link>
          <button 
            @click="addToCart(product)"
            class="flex-1 bg-emerald-500 text-white px-2 py-1 rounded hover:bg-emerald-600 transition-colors text-sm"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>

    <div v-if="filteredProducts.length === 0" class="text-center py-8">
      Nenhum produto encontrado
    </div>

    <div class="flex justify-center mt-10 space-x-4">
      <button
        @click="prevPage"
        :disabled="page === 1"
        class="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
      >
        Anterior
      </button>
      <button
        @click="nextPage"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Próximo
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { inject } from 'vue';

const cart = inject('cart');
const products = ref([]);
const allProducts = ref([]);
const page = ref(1);
const limit = 12;
const localSearchTerm = ref('');

const addToCart = (product) => {
  cart.add(product);
};

const filteredProducts = computed(() => {
  if (!localSearchTerm.value) return products.value;
  
  return allProducts.value.filter(product => 
    product.title.toLowerCase().includes(localSearchTerm.value.toLowerCase()) ||
    product.category.toLowerCase().includes(localSearchTerm.value.toLowerCase())
  );
});

const fetchProducts = async () => {
  const skip = (page.value - 1) * limit;
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,category,thumbnail`
  );
  const data = await response.json();
  products.value = data.products;
  
  if (page.value === 1) {
    const allResponse = await fetch('https://dummyjson.com/products?limit=100');
    const allData = await allResponse.json();
    allProducts.value = allData.products;
  }
};

onMounted(fetchProducts);
watch(page, fetchProducts);

const nextPage = () => page.value++;
const prevPage = () => { if (page.value > 1) page.value--; };
</script>