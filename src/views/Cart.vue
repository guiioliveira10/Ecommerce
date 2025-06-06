<template>
  <div class="container mx-auto p-4">
    <h2 class="text-xl font-bold mb-6 text-center">Carrinho de Compras</h2>
    
    <div v-if="cart.items.length === 0" class="text-center py-8"> <!--carrinho vazio-->
      <p class="text-gray-500 mb-4">Vazio</p>
    </div>

    <div v-else>
      <div v-for="item in cart.items" :key="item.id" class="flex items-center border-b py-4">
        <img :src="item.thumbnail" :alt="item.title" class="w-16 h-16 object-contain mr-4"/>

        <div class="flex-grow">
          <h3 class="font-medium">{{ item.title }}</h3>
          <p class="text-gray-600">${{ item.price }}</p>
        </div>
        
        <!--atualizar quando aumenta ou diminui a quantidade-->
        <div class="flex items-center"> 
          <button @click="cart.update(item.id, item.quantity - 1)" :disabled="item.quantity <= 1" class="px-2 py-1 bg-gray-200 rounded-l">-
          </button>
          <span class="px-3 py-1 bg-gray-100">{{ item.quantity }}</span>
          <button @click="cart.update(item.id, item.quantity + 1)" class="px-2 py-1 bg-gray-200 rounded-r">+
          </button>
        </div>
        
        <div class="ml-4 text-right">
          <p class="font-medium">${{ (item.price * item.quantity).toFixed(2) }}</p>
          <button @click="remove(item.id)" class="text-red-500 text-sm">Remover
          </button>
        </div>
      </div>
      
      <div class="mt-8 text-center">
        <p class="text-xl font-bold mb-4">Total: $ {{ total.toFixed(2) }}</p>
        <button @click="checkout" class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">Finalizar Compra</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';

const cart = inject('cart');

const total = computed(() => {
  return cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0); //calculo
});

const checkout = () => {
  alert('Compra finalizada com sucesso!');
};
</script>