<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold text-center mb-8">Meu Carrinho</h2>
    
    <div v-if="cart.items.length === 0" class="text-center py-12">
      <p class="text-gray-500 mb-4">Seu carrinho está vazio</p>
      <router-link 
        to="/" 
        class="bg-blue-500 text-white px-4 py-2 rounded inline-block hover:bg-blue-600"
      >
        Voltar às compras
      </router-link>
    </div>

    <div v-else>
      <div v-for="item in cart.items" :key="item.id" class="flex items-center border-b py-4 gap-4">
        <img 
          :src="item.thumbnail" 
          :alt="item.title" 
          class="w-16 h-16 object-contain bg-gray-100 rounded"
        />
        
        <div class="flex-1">
          <h3 class="font-medium">{{ item.title }}</h3>
          <p class="text-gray-600 text-sm">$ {{ item.price.toFixed(2) }}</p>
        </div>
        
        <div class="flex items-center">
          <button 
            @click="cart.update(item.id, item.quantity - 1)"
            :disabled="item.quantity <= 1"
            class="px-2 py-1 bg-gray-200 rounded-l"
          >
            -
          </button>
          <span class="px-3 py-1 bg-gray-100">{{ item.quantity }}</span>
          <button 
            @click="cart.update(item.id, item.quantity + 1)"
            class="px-2 py-1 bg-gray-200 rounded-r"
          >
            +
          </button>
        </div>
        
        <div class="ml-4 text-right">
          <p class="font-bold">$ {{ (item.price * item.quantity).toFixed(2) }}</p>
          <button 
            @click="cart.remove(item.id)"
            class="text-red-500 text-sm hover:text-red-700"
          >
            Remover
          </button>
        </div>
      </div>
      
      <div class="mt-8 text-center">
        <p class="text-xl font-bold mb-4">Total: $ {{ total.toFixed(2) }}</p>
        <button 
          @click="checkout"
          class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';

const cart = inject('cart');

const total = computed(() => {
  return cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

const checkout = () => {
  alert('Compra finalizada com sucesso!');
};
</script>