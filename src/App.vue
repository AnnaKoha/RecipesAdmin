<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useRootStore } from './stores/root';

const rootStore = useRootStore()

onMounted(() => {
  rootStore.getAreas();
  rootStore.getCategories();
  rootStore.getIngredients();
})
</script>

<template>
  <RouterView />
</template>

<style lang="sass" scoped>
@import '@/assets/styles/index'
</style>
