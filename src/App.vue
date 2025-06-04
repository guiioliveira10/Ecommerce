<script>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '../src/components/NavbarComponent.vue'
import Footer from '../src/components/FooterComponent.vue'

export default {
  components: {
    Navbar,
    Footer,
  },
 data() {
    return {
      termoBusca: "",
      cart: [],
    };
  },
  methods: {
    buscarProdutos(termo) {
      this.termoBusca = termo;
    },
    verDetalhes(produto) {
      this.$router.push(`/produto/${produto.id}`);
    },
addToCart(product) {
      const existingProduct = this.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(productId) {
      this.cart = this.cart.filter(item => item.id !== productId);
    },
    updateQuantity(productId, newQuantity) {
      const product = this.cart.find(item => item.id === productId);
      if (product) {
        product.quantity = Math.max(1, newQuantity);
      }
    }
  },
  provide() {
    return {
      cart: {
        items: this.cart,
        add: this.addToCart,
        remove: this.removeFromCart,
        update: this.updateQuantity
      }
    };
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar @buscar="buscarProdutos" />

    <main class="flex-1 p-4">
      <router-view :termoBusca="termoBusca" @ver-detalhes="verDetalhes" />
    </main>
    
    <footer class="mt-auto">
      <Footer />
    </footer>
  </div>
</template>
