<script setup>
	import { defineProps, defineEmits } from "vue"
	import { storeNote } from "../../stores/note"

	const store = storeNote()

	const props = defineProps({
		categories: {
			type: Array,
			required: true,
		},
	})

	const updateCatColor = (identifier, color) => {
		store.updateCategoryColor(identifier, color)
	}
	const updateCatName = (identifier, name) => {
		store.updateCategoryName(identifier, name)
	}

	/* Emits */
	const emit = defineEmits(["closeCategoryModal", "createCategory"])

	const closeCategoryModal = () => {
		emit("closeCategoryModal")
	}
	const createCategory = () => {
		emit("createCategory")
	}
	const removeCategory = (id) => {
		store.removeCategory(id)
	}
</script>

<template>
	<div class="modal">
		<div class="modal-background" @click="closeCategoryModal()"></div>

		<div class="modal-container">
			<div class="modal-header">
				<div class="modal-title">
					<p>CATEGORIES</p>
				</div>
				<div class="modal-menu">
					<i class="bi bi-plus-circle" @click="createCategory()"></i>
				</div>
			</div>

			<div class="categories-box">
				<div
					v-for="(category, index) in categories"
					class="category-box"
				>
					<input
						type="color"
						v-model="category.color"
						@blur="updateCatColor(category.id, category.color)"
					/>
					<input
						type="text"
						v-model="category.name"
						@blur="updateCatName(category.id, category.name)"
					/>
					<i
						class="context-img bi bi-dash-circle"
						@click="removeCategory(category.id)"
					></i>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
	@import "./modals.css";
	@import "./Category_modal.css";
</style>
