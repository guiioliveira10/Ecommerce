<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '../src/components/NavbarComponent.vue'
import Footer from '../src/components/FooterComponent.vue'
</script>


<template>
  <div class="min-h-screen flex flex-col">
    <Navbar @buscar="buscarProdutos" />
    
    <main class="flex-1 p-4">
      <router-view :termoBusca="termoBusca" @ver-detalhes="verDetalhes" />
    </main>

    <Footer />
  </div>
</template>

<script>
export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      termoBusca: "",
    };
  },
  methods: {
    buscarProdutos(termo) {
      this.termoBusca = termo;
    },
    verDetalhes(produto) {
      this.$router.push(`/produto/${produto.id}`);
    },
  },
};
</script>
