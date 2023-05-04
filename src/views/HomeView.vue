<script setup>
	import { ref } from "vue"
    import { RouterLink } from "vue-router"
	import Card from "../components/Home/Card.vue"

	const cards = ref([
		{
			title: "Notes",
			description: "Create notes and customize them",
			icon: "bi bi-book",
			path: "/notes",
		},
		{
			title: "Lists",
			description: "Create your own lists and customize them",
			icon: "bi bi-card-checklist",
			path: "/lists",
		},
	])

	const card = ref({
		card: {
			title: "",
			description: "",
			icon: "",
			path: "",
		},
	})
</script>

<template>
	<div id="cards-box">
		<RouterLink v-for="card in cards" :to="card.path">
			<Card :properties="card" />
		</RouterLink>
	</div>
</template>

<style scoped>
	@import "../components/Home/home.css";
</style>
