<script setup>
	import { ref, watch, onMounted } from "vue"
	import { storeToRefs } from "pinia"
	import { storeList } from "../stores/list"
	import Category from "../components/Lists/Category.vue"

	const store = storeList()

	const { categories } = storeToRefs(store)
	const { items } = storeToRefs(store)

	const showPinned = ref(false)
	const checkedOptions = ref({
		showCheckeds: false,
		hideCheckeds: false
	})

	onMounted(() => {
		store.loadCategoriesFromLocal()
		store.loadItemsFromLocal()
		store.cleanTrash()
	})

	/* Categories */
	const addCategory = () => {
		store.addCategory()
	}
	const removeCategory = (identifier) => {
		store.removeCategory(identifier)
	}

	/* Options */
	const togglePinned = () => {
		showPinned.value = !showPinned.value
	}
	const onlyCheckeds = () => {
		checkedOptions.value.showCheckeds = !checkedOptions.value.showCheckeds
		checkedOptions.value.hideCheckeds = false
	}
	const hideCheckeds = () => {
		checkedOptions.value.hideCheckeds = !checkedOptions.value.hideCheckeds
		checkedOptions.value.showCheckeds = false
	}
	const draggingStarted = () => {
		categories.value.map((c) => {
			c.isDragging = true
		})
	}
	const draggingFinished = () => {
		categories.value.map((c) => {
			c.isDragging = false
		})
	}

	/* Observar los cambios */
	watch(
		items,
		() => {
			console.log("Items ha cambiado")
			store.saveItems()
		},
		{
			deep: true,
		}
	)
	watch(
		categories,
		() => {
			console.log("Categories ha cambiado")
			store.saveCategories()
		},
		{
			deep: true,
		}
	)
</script>

<template>
	<div id="list-menu">
		<div class="menu-item" @click="addCategory()">
			<div class="menu-icon">
				<i class="title-img bi bi-plus-circle"></i>
			</div>
			<div class="menu-text">
				<span>New Category</span>
			</div>
		</div>
		<div class="menu-item" @click="togglePinned()">
			<div class="menu-icon">
				<i class="title-img bi bi-pin-angle"></i>
			</div>
			<div class="menu-text">
				<span>Toggle Pins</span>
			</div>
		</div>
		<div class="menu-item" @click="onlyCheckeds()">
			<div class="menu-icon">
				<i class="title-img bi bi-check-square-fill"></i>
			</div>
			<div class="menu-text">
				<span>Only Checkeds</span>
			</div>
		</div>
		<div class="menu-item" @click="hideCheckeds()">
			<div class="menu-icon">
				<i class="title-img bi bi-check-square"></i>
			</div>
			<div class="menu-text">
				<span>Hide Checkeds</span>
			</div>
		</div>
	</div>

	<div id="list-box" :style="{ flexDirection: 'column' }" v-if="showPinned">
		<div id="pinned-box">
			<div class="categories-title">
				<p class="list-box-title">
					<i class="bi bi-pin-angle-fill"></i>
				</p>
			</div>

			<div class="categories-box">
				<template v-for="category in categories">
					<Category
						:key="category.id"
						v-if="category.isPinned"
						:propiedad="category"
						:propItems="items"
						:checkedOptions="checkedOptions"
						@removeCategory="removeCategory(category.id)"
						@draggingStarted="draggingStarted()"
						@draggingFinished="draggingFinished()"
					/>
				</template>
			</div>
		</div>

		<div id="notpinned-box">
			<div class="categories-title">
				<p class="list-box-title"><i class="bi bi-pin-angle"></i></p>
			</div>
			<div class="categories-box">
				<template v-for="category in categories">
					<Category
						:key="category.id"
						v-if="!category.isPinned"
						:propiedad="category"
						:propItems="items"
						:checkedOptions="checkedOptions"
						@removeCategory="removeCategory(category.id)"
						@draggingStarted="draggingStarted()"
						@draggingFinished="draggingFinished()"
					/>
				</template>
			</div>
		</div>
	</div>

	<div id="list-box" :style="{ flexDirection: 'row' }" v-else>
		<Category
			v-for="category in categories"
			:propiedad="category"
			:propItems="items"
			:checkedOptions="checkedOptions"
			@removeCategory="removeCategory(category.id)"
			@draggingStarted="draggingStarted()"
			@draggingFinished="draggingFinished()"
		/>
	</div>
</template>

<style scoped>
	@import "../components/Lists/list.css";
</style>
