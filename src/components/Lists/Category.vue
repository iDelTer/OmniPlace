<script setup>
	import { defineProps, defineEmits } from "vue"
	import { storeToRefs } from "pinia"
	import { storeList } from "../../stores/list"
	import Item from "./Item.vue"

	const store = storeList()
	const { items } = storeToRefs(store)

	const props = defineProps({
		propiedad: {
			type: Object,
			required: true,
		},
		checkedOptions: {
			type: Object,
			required: true,
		},
	})

	/* Categories */
	const removeCategory = () => {
		emit("removeCategory", String(props.propiedad.id))
	}
	const updateCatName = (name) => {
        store.updateCategoryName(props.propiedad.id, name)
	}
	const updateCatColor = (newColor) => {
        store.updateCategoryColor(props.propiedad.id, newColor)
	}
	const updateCatPin = () => {
        store.updateCategoryPin(props.propiedad.id, !props.propiedad.isPinned)
	}

	/* Item */
	const addItem = (categoryValue) => {
		store.addItem(categoryValue)
	}
	const removeItem = (identifier) => {
		store.removeItem(identifier)
	}

	/* Options */
	const dragStartHandler = (item, event) => {
		event.dataTransfer.setData("item", JSON.stringify(item))
		emit("draggingStarted")
	}
	const dropHandler = (event) => {
		const item = JSON.parse(event.dataTransfer.getData("item"))
		store.updateItemCategory(item.id, props.propiedad.id)
		emit("draggingFinished")
	}
	const keyManagement = (eKey, eTxt) => {
		if (eKey.key === "Enter") {
			updateCatName(eTxt)
			eKey.target.blur()
		}
	}

	/* Emits */
	const emit = defineEmits([
		"removeCategory",
		"draggingStarted",
		"draggingFinished",
	])
</script>

<template>
	<div
		:key="propiedad.id"
		class="category-box"
		:style="{ borderColor: propiedad.color }"
		@dragover.prevent
		@drop="dropHandler($event)"
		:class="{ dragging: propiedad.isDragging }"
	>
		<div class="category-title" :style="{ borderColor: propiedad.color }">
			<div class="title-img-box" :style="{ color: propiedad.color }">
				<div class="title-img-item">
					<input
						type="color"
						class="title-color"
						v-model="propiedad.color"
						@blur="updateCatColor(propiedad.color)"
					/>
				</div>
				<div class="title-img-item">
					<i
						class="title-img bi bi-plus-circle"
						@click="addItem(propiedad.id)"
					></i>
				</div>
				<div class="title-img-item">
					<i
						class="title-img bi bi-dash-circle"
						@click="removeCategory"
					></i>
				</div>
				<div class="title-img-item">
					<i
						class="title-img bi bi-pin-angle"
						@click="updateCatPin()"
						v-if="!propiedad.isPinned"
					></i>
					<i
						class="title-img bi bi-pin-angle-fill"
						@click="updateCatPin()"
						v-else
					></i>
				</div>
			</div>

			<div class="title-text-box">
				<input
					type="text"
					class="title-text"
					:value="propiedad.name"
					:style="{
						borderColor: propiedad.color,
						color: propiedad.color,
					}"
					@focusout="updateCatName($event.target.value)"
					@keypress="keyManagement($event, $event.target.value)"
				/>
			</div>
		</div>

		<div class="items-container" v-if="checkedOptions.showCheckeds">
			<div class="item" v-for="item in items">
				<Item
					v-if="item.category === propiedad.id && item.isChecked"
					:propiedades="item"
					:catColor="String(propiedad.color)"
					@removeItem="removeItem(item.id)"
					:draggable="true"
					@dragstart="dragStartHandler(item, $event)"
				/>
			</div>
		</div>

		<div class="items-container" v-else-if="checkedOptions.hideCheckeds">
			<div class="item" v-for="item in items">
				<Item
					v-if="item.category === propiedad.id && !item.isChecked"
					:propiedades="item"
					:catColor="String(propiedad.color)"
					@removeItem="removeItem(item.id)"
					:draggable="true"
					@dragstart="dragStartHandler(item, $event)"
				/>
			</div>
		</div>

		<div class="items-container" v-else>
			<div class="item" v-for="item in items">
				<Item
					v-if="item.category === propiedad.id"
					:propiedades="item"
					:catColor="String(propiedad.color)"
					@removeItem="removeItem(item.id)"
					:draggable="true"
					@dragstart="dragStartHandler(item, $event)"
				/>
			</div>
		</div>
	</div>
</template>

<style>
	@import "./category.css";
</style>
