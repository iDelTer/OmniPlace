<script setup>
	import { reactive } from "vue"
	import { uuid4 as gId } from "uuid4"
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
	</div>
	<div id="list-box">
		<Category
			v-for="category in categories"
			:propiedad="category"
			:propItems="items"
		/>
	</div>
</template>

<script>
	import Category from "./Category.vue"

	export default {
		components: {
			Category,
		},
		data() {
			return {
				items: [],
				categories: [
					{ id: this.createId(), name: "Hogar", color: "#09ddf2" },
					{ id: this.createId(), name: "Ocio", color: "#ee1cfa" },
					{ id: this.createId(), name: "Trabajo", color: "#000000" },
					{ id: this.createId(), name: "Estudios", color: "#ff0000" },
				],
			}
		},
		methods: {
			createId() {
				let id = gId()
				gId.valid(id)
				return id
			},
			addCategory() {
                let obj = {
                    id: this.createId(),
				    name: "Edit Name",
				    color: "#000000",
                }
                console.log(this.categories)
                this.categories.push(obj)
			}
		},
	}
</script>

<style>
	@import "./list.css";
</style>
