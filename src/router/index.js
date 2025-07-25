import { createRouter, createWebHistory } from 'vue-router';
import { ROUTER_PATHS } from '../constans';
import Home from '../pages/Home.vue';
import Categories from '../pages/Categories.vue';
import Recipe from '../pages/Recipe.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTER_PATHS.HOME,
      name: 'home',
      component: Home,
    },
     {
      path: ROUTER_PATHS.CATEGORIES,
      name: 'categories',
      component: Categories,
    },
    {
      path: ROUTER_PATHS.RECIPE,
      name: 'recipe',
      component: Recipe,
    }
  ],
})

export default router
