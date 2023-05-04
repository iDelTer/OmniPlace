<script setup>
	import { ref, watch, onMounted } from "vue"
	import { storeToRefs } from "pinia"
	import { storeNote } from "../stores/note"
	import Note from "../components/Notes/Note.vue"
	import Note_Modal from "../components/Modals/Note_Modal.vue"
	import Category_Modal from "../components/Modals/Category_Modal.vue"

	const store = storeNote()

	const { categories } = storeToRefs(store)
	const { notes } = storeToRefs(store)

	onMounted(() => {
		store.loadCategoriesFromLocal()
		store.loadNotesFromLocal()
	})

	const options = ref({
		showPinned: false,
		onlyPinned: false,
		modal: {
			notes: {
				showModal: false,
				noteId: "",
			},
			categories: {
				showModal: false,
			},
		},
	})

	/* Notes */
	const createNote = () => {
		store.addNote()
        console.log(`Se va a crear una nueva nota`)
	}
	const removeNote = (identifier) => {
		store.removeNote(identifier)
        console.log(`Se va a borrar una nota`)
	}
	const getNote = (identifier) => {
		console.log(`Identifier: ${identifier}`)
		const note = store.getNote(identifier)
        console.log(`Se ha cogido la nota ${note[0].id}`)
		return note[0]
	}

	/* Categories */
	const createCategory = () => {
		store.addCategory()
        console.log(`Se va a crear una nueva categoría`)
	}
    const removeCategory = (identifier) => {
		store.removeCategory(identifier)
        console.log(`Se va a borrar una categoría`)
	}

	/* Options */
	const togglePinned = () => {
		options.value.showPinned = !options.value.showPinned
	}
	const onlyPinned = () => {
		options.value.onlyPinned = !options.value.onlyPinned
		options.value.showPinned = !options.value.onlyPinned
	}
	const openNoteModal = (identifier) => {
		options.value.modal.notes.noteId = identifier
		options.value.modal.notes.showModal = true
		options.value.modal.categories.showModal = false
	}
    const closeNoteModal = () => {
		options.value.modal.notes.showModal = false
		options.value.modal.categories.showModal = false
	}
    const openCategoryModal = () => {
		options.value.modal.categories.showModal = true
		options.value.modal.notes.showModal = false
	}
	const closeCategoryModal = () => {
		options.value.modal.categories.showModal = false
		options.value.modal.notes.showModal = false
	}

	/* Watch */
	watch(
		notes,
		() => {
			console.log("Notes ha cambiado")
			store.saveNotes()
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
	<div id="notes-menu">
		<div class="menu-item" @click="createNote()">
			<div class="menu-icon">
				<i class="title-img bi bi-plus-circle"></i>
			</div>
			<div class="menu-text">
				<span>New Note</span>
			</div>
		</div>

		<div class="menu-item" @click="openCategoryModal()">
			<div class="menu-icon">
				<i class="title-img bi bi-gear"></i>
			</div>
			<div class="menu-text">
				<span>Manage Categories</span>
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

		<div class="menu-item" @click="onlyPinned()">
			<div class="menu-icon">
				<i class="title-img bi bi-pin-angle-fill"></i>
			</div>
			<div class="menu-text">
				<span>Only Pins</span>
			</div>
		</div>
	</div>

	<div id="notes-box" v-if="options.showPinned">
		<div id="pinned-box">
			<div class="categories-title">
				<p class="list-box-title">
					<i class="bi bi-pin-angle-fill"></i>
				</p>
			</div>

			<template v-for="note in notes">
				<Note
					:key="note.id"
					v-if="note.isPinned"
					:properties="note"
					:categories="categories"
					@removeNote="removeNote(note.id)"
					@openModal="openNoteModal(note.id)"
				/>
			</template>
		</div>

		<div id="notpinned-box" v-if="!options.onlyPinned">
			<div class="categories-title">
				<p class="list-box-title"><i class="bi bi-pin-angle"></i></p>
			</div>

			<template v-for="note in notes">
				<Note
					:key="note.id"
					v-if="!note.isPinned"
					:properties="note"
					:categories="categories"
					@removeNote="removeNote(note.id)"
					@openModal="openNoteModal(note.id)"
				/>
			</template>
		</div>
	</div>

	<div id="notes-box" v-else>
		<Note
			v-for="note in notes"
			:properties="note"
			:categories="categories"
			@removeNote="removeNote(note.id)"
			@openModal="openNoteModal(note.id)"
		/>
	</div>

	<Note_Modal
		v-if="options.modal.notes.showModal"
		:properties="getNote(options.modal.notes.noteId)"
		:categories="categories"
		@closeNoteModal="closeNoteModal()"
	/>
	<Category_Modal
		v-if="options.modal.categories.showModal"
		:categories="categories"
		@closeCategoryModal="closeCategoryModal()"
		@removeCategory="removeCategory(identifier)"
		@createCategory="createCategory()"
	/>
</template>

<style scoped>
	@import "../components/Notes/notes.css";
</style>
