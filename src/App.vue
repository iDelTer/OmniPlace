<script setup>
  import { RouterView } from 'vue-router'
	import Lists from "./components/Lists/Lists.vue"
  import Navbar from './components/Navbar/Navbar.vue'
</script>

<template>
  <Navbar />
	<!-- <Lists /> -->
  <RouterView />
</template>

<style scoped>
</style>
