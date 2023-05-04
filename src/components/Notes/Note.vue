<script setup>
	import { defineProps, defineEmits } from "vue"
	import { storeToRefs } from "pinia"
	import { storeNote } from "../../stores/note"

	const store = storeNote()

	const props = defineProps({
		properties: {
			type: Object,
			required: true,
		},
		categories: {
			type: Array,
			required: true,
		},
	})

	/* Options */
	const togglePinned = () => {
		props.properties.isPinned = !props.properties.isPinned
	}
	const toggleContext = () => {
		props.properties.showContext = !props.properties.showContext
	}
	const removeNote = (identifier) => {
		emit("removeNote", identifier)
		toggleContext()
	}
	const openModal = (identifier) => {
		emit("openModal", identifier)
		toggleContext()
	}
	const getCategoryName = (identifier) => {
        const cat = store.getCategoryName(identifier)
        console.log(`Cat es: ${cat}`)
        return cat[0].name
	}
	const getCategoryColor = (identifier) => {
        const cat = store.getCategoryColor(identifier)
        console.log(`Cat es: ${cat}`)
        return cat[0].color
	}

	/* Emits */
	const emit = defineEmits(["removeNote", "openModal"])
</script>

<template>
	<div class="note">
		<div class="note-header">
			<div class="note-title">
				<p class="title-text">{{ props.properties.title }}</p>
			</div>

			<div class="note-menu">
				<div class="note-menu-item" v-if="props.properties.isPinned">
					<i
						class="title-img bi bi-pin-angle-fill"
						@click="togglePinned()"
					></i>
				</div>
				<div class="note-menu-item" v-else>
					<i
						class="title-img bi bi-pin-angle"
						@click="togglePinned()"
					></i>
				</div>
				<div class="note-menu-item">
					<i
						class="bi bi-three-dots-vertical"
						@click="toggleContext()"
					></i>
				</div>
			</div>
		</div>

		<div class="note-content">
			<p class="content-text">
				{{ `${props.properties.content.substring(0, 700)}...` }}
			</p>
		</div>

		<div class="note-categories" v-if="props.properties.categories.length">
			<div
				class="note-category"
				v-if="props.properties.categories.length > 0"
				v-for="cat in props.properties.categories"
				:style="{
					color: getCategoryColor(cat),
					borderColor: getCategoryColor(cat),
				}"
			>
				<span class="category-text">{{ getCategoryName(cat) }}</span>
			</div>
		</div>

		<div
			class="note-context"
			v-if="props.properties.showContext"
			@mouseleave="toggleContext()"
		>
			<div class="context-item" @click="removeNote(props.properties.id)">
				<i class="context-icon bi bi-dash-circle"></i>
				<span class="context-text">Remove</span>
			</div>
			<div class="context-item" @click="openModal(props.properties.id)">
				<i class="context-icon bi bi-pencil"></i>
				<span class="context-text">Edit</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
	@import "./note.css";
</style>
