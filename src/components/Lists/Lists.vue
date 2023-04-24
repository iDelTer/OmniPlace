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
            @removeCategory="removeCategory(category.id)"
			@draggingStarted="draggingStarted()"
			@draggingFinished="draggingFinished()"
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
					{ id: this.createId(), name: "Hogar", color: "#09ddf2", isDragging: false },
					{ id: this.createId(), name: "Ocio", color: "#ee1cfa", isDragging: false },
					{ id: this.createId(), name: "Trabajo", color: "#000000", isDragging: false },
					{ id: this.createId(), name: "Estudios", color: "#ff0000", isDragging: false },
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
					isDragging: false
                }
                this.categories.push(obj)
			},
            removeCategory(identifier){
                let index = this.categories.findIndex(item => item.id === identifier)
                this.categories.splice(index, 1)
            },
			draggingStarted(){
				this.categories.map(c => {
					c.isDragging = true
				})
				document.body.style.cursor = "dragging"
			},
			draggingFinished(){
				this.categories.map(c => {
					c.isDragging = false
				})
				document.body.style.cursor = "auto"
			}
		},
	}
</script>

<style>
	@import "./list.css";
</style>
