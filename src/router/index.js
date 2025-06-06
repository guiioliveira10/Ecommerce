import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import ProductDetails from '../views/ProductDetails.vue';
import Cart from '../views/Cart.vue';
import CategoryProducts from '../views/CategoryProducts.vue';
import ProductList from '../views/ProductList.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/produto/:id', name: 'ProductDetails', component: ProductDetails, props: true },
  { path: '/carrinho', name: 'Cart', component: Cart },
  { path: '/category/:category', name: 'Category', component: CategoryProducts, props: true },
  { path: '/produtos', name: 'ProductList', component: ProductList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;