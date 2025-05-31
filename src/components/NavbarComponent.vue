<template>
  <nav class="bg-slate-800 text-white p-4 flex flex-col md:flex-row items-center justify-between gap-2 shadow-md">
    <h1 class="text-2xl font-bold">MARCH 25</h1>
    <div class="flex flex-col md:flex-row gap-2 items-center">
      <input
        type="text"
        placeholder="Buscar produto..."
        v-model="searchTerm"
        @input="$emit('buscar', searchTerm)"
        class="px-3 py-1 rounded-md bg-white text-gray-500"
      />
      <RouterLink to="/carrinho" class="bg-white text-blue-600 px-3 py-1 rounded-md font-semibold hover:bg-gray-200">
        Carrinho 🛒
      </RouterLink>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      searchTerm: "",
    };
  },
};
</script>