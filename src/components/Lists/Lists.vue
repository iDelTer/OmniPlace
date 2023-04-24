<script setup>
import { reactive } from "vue";
import { uuid4 as gId } from "uuid4";
</script>

<template>
	<div id="list-menu">
		<div class="menu-item" @click="addCategory()">
			<div class="menu-icon">
				<i class="title-img bi bi-plus-circle"></i>
			</div>
			<div class="menu-text">
				<span>Category</span>
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
	</div>

	<div id="list-box" :style="{flexDirection: 'column'}" v-if="showPinned">
		<div id="pinned-box">
			<div class="categories-title">
				<p class="list-box-title">PINNED LISTS</p>
			</div>

			<div class="categories-box">
				<template v-for="category in categories">
					<Category
						:key="category.id"
						v-if="category.isPinned"
						:propiedad="category"
						:propItems="items"
						@removeCategory="removeCategory(category.id)"
						@draggingStarted="draggingStarted()"
						@draggingFinished="draggingFinished()"
					/>
				</template>
			</div>
		</div>

		<div id="notpinned-box">
			<div class="categories-title">
				<p class="list-box-title">NO PINNED LISTS</p>
			</div>
			<div class="categories-box">
				<template v-for="category in categories">
					<Category
						:key="category.id"
						v-if="!category.isPinned"
						:propiedad="category"
						:propItems="items"
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
			@removeCategory="removeCategory(category.id)"
			@draggingStarted="draggingStarted()"
			@draggingFinished="draggingFinished()"
		/>
	</div>

</template>

<script>
import Category from "./Category.vue";

export default {
	components: {
		Category
	},
	data() {
		return {
			items: [],
			categories: [],
			showPinned: false,
			category: {
				id: "",
				name: "",
				color: "",
				isPinned: false,
				isDragging: false
			}
		};
	},
	methods: {
		createId() {
			let id = gId();
			gId.valid(id);
			return id;
		},
		addCategory() {
			let obj = {
				id: this.createId(),
				name: "Edit Name",
				color: "#000000",
				isPinned: false,
				isDragging: false
			};
			this.categories.push(obj);
		},
		removeCategory(identifier) {
			let index = this.categories.findIndex(
				(item) => item.id === identifier
			);
			this.categories.splice(index, 1);
		},
		togglePinned() {
			this.showPinned = !this.showPinned;
		},
		draggingStarted() {
			this.categories.map((c) => {
				c.isDragging = true;
			});
		},
		draggingFinished() {
			this.categories.map((c) => {
				c.isDragging = false;
			});
		},
		loadCategoriesFromLocal() {
			const categoriesFromLocal = localStorage.getItem("categories");
			if (categoriesFromLocal) {
				this.categories = JSON.parse(categoriesFromLocal);
			}
		},
		loadItemsFromLocal() {
			const ItemsFromLocal = localStorage.getItem("items");
			if (ItemsFromLocal) {
				this.items = JSON.parse(ItemsFromLocal);
			}
		},
		cleanTrash() {
			this.items.map((item, index) => {
				let exists = false;
				this.categories.map((cat) => {
					if (item.category === cat.id) {
						exists = true;
					}
				});
				if (!exists) {
					this.items.splice(index, 1);
				}
			});
		}
	},
	watch: {
		categories: {
			deep: true,
			handler: (newVal) => {
				const watch = newVal.map(({ id, name, color, isPinned }) => ({
					id,
					name,
					color,
					isPinned
				}));
				localStorage.setItem("categories", JSON.stringify(watch));
			}
		}
	},
	mounted() {
		this.loadCategoriesFromLocal();
		this.loadItemsFromLocal();
		this.cleanTrash();
	}
};
</script>

<style>
@import "./list.css";
</style>
