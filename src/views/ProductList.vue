<template>
  <div> 
    <h2 class="text-2xl font-bold mb-2 flex justify-end">Procura algo específico hoje?</h2>

    <div class="flex justify-end mb-6">
      <div class="w-full md:w-96">
        <input
          type="text"
          placeholder="Buscar produtos..."
          v-model="localSearchTerm"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>
    </div>

    <div class="flex justify-start mb-4">
      <select v-model="sortOption" class="border px-3 py-2 rounded-md">
        <option value="">Ordenar por...</option>
        <option value="price-asc">Preço: Menor para Maior</option>
        <option value="price-desc">Preço: Maior para Maior</option>
        <option value="title-asc">Nome: A-Z</option>
        <option value="title-desc">Nome: Z-A</option>
      </select>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
        <div class="flex flex-col items-center flex-grow">
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="w-full h-40 object-contain mb-2"/>
          <h3 class="text-center text-sm font-semibold mb-1">{{ product.title }}</h3>
          <p class="text-sm text-gray-500 capitalize text-center">{{ product.category }}</p>
          <p class="text-base font-bold mt-1">$ {{ product.price }}</p>
        </div>

        <div class="flex justify-between mt-auto pt-2 space-x-2">
          <router-link
            :to="`/produto/${product.id}`"
            class="flex-1 text-center bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors text-sm">
            Detalhes
          </router-link>
          <button 
            @click="addToCart(product)"
            class="flex-1 bg-emerald-500 text-white px-2 py-1 rounded hover:bg-emerald-600 transition-colors text-sm">
            Adicionar
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-10 space-x-4">
      <button
        @click="prevPage"
        :disabled="page === 1"
        class="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50">
        Anterior
      </button>
      <button
        @click="nextPage"
        :disabled="isLastPage"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Próximo
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { inject } from 'vue';
import axios from 'axios';

const cart = inject('cart');
const allProducts = ref([]);
const page = ref(1);
const limit = 12;
const localSearchTerm = ref('');
const sortOption = ref('');

const addToCart = (product) => {
  cart.add(product);
};

const filteredProducts = computed(() => {
  let filtered = allProducts.value;

  if (localSearchTerm.value) {
    const searchTerm = localSearchTerm.value.toLowerCase();
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }

  if (sortOption.value) {
    const [key, order] = sortOption.value.split('-');
    filtered = filtered.slice().sort((a, b) => {
      if (key === 'price') {
        return order === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (key === 'title') {
        return order === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });
  }

  const start = (page.value - 1) * limit;
  const end = start + limit;
  return filtered.slice(start, end);
});

const isLastPage = computed(() => {
  let filtered = allProducts.value;

  if (localSearchTerm.value) {
    const searchTerm = localSearchTerm.value.toLowerCase();
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }

  return page.value >= Math.ceil(filtered.length / limit);
});

const prevPage = () => {
  if (page.value > 1) page.value--;
};

const nextPage = () => {
  if (!isLastPage.value) page.value++;
};

const fetchProducts = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products?limit=100');
    allProducts.value = response.data.products;
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }
};

onMounted(fetchProducts);

watch([localSearchTerm, sortOption], () => {
  page.value = 1;
});
</script>
