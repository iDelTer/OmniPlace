<script setup>
    import { uuid4 as gId } from "uuid4"
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
					<i class="bi bi-plus-circle" @click="addCategory"></i>
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
                    @click="removeCategory(category.id)"></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			categories: {
				type: Array,
				required: true,
			},
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
                    color: "#000000"
                }
                this.categories.push(obj)
            },
			updateCatColor(id, color) {
				let index = this.categories.findIndex((item) => item.id === id)
				this.categories[index].color = color
			},
			updateCatName(id, name) {
				let index = this.categories.findIndex((item) => item.id === id)
				this.categories[index].name = name
			},
			closeCategoryModal() {
				this.$emit("closeCategoryModal")
			},
            removeCategory(id){
                this.$emit('removeCategory', id)
            }
		},
		emits: ["closeCategoryModal"],
	}
</script>
<style>
	@import "./modals.css";
	@import "./Category_modal.css";
</style>
