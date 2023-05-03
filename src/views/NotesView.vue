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
    }

    /* Categories */
    const openCategoryModal = () => {
       options.value.modal.categories.showModal = true
    }
    const closeCategoryModal = () => {
       options.value.modal.categories.showModal = false
    }
    const createCategory = () => {
       store.addCategory()
    }
    const togglePinned = () => {
        options.value.showPinned = !options.value.showPinned
    }
    const onlyPinned = () => {
        options.value.onlyPinned = !options.value.onlyPinned
        options.value.showPinned = !options.value.onlyPinned
    }

    /* Observar los cambios */
    watch(
        notes, () =>{
            console.log('Notes ha cambiado')
            store.saveNotes()
        }, {
            deep: true
        }
    )
    watch(
        categories, () => {
            console.log('Categories ha cambiado')
            store.saveCategories()
        }, {
            deep: true
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
			@openModal="openModal(note.id)"
		/>
	</div>

	<Note_Modal
		v-if="options.modal.notes.showModal"
		:properties="getNote(options.modal.noteId)"
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

<!-- <script>
	export default {
        components: {
            Note
        },
        methods: {
            addNote(){
                let obj = {
                    id: this.createId(),
                    title: 'New note',
                    content: 'Start writing this note!',
                    categories: [],
                    isPinned: false,
                    showContext: false
                }
                this.notes.push(obj)
            },
            removeCategory(identifier){
                let index = this.categories.findIndex(
                    (item) => item.id === identifier
                );
                this.categories.splice(index, 1);
            },
            removeNote(identifier){
                let index = this.notes.findIndex(
                    (item) => item.id === identifier
                );
                this.notes.splice(index, 1);
            },
            openNoteModal(identifier){
                this.options.modal.notes.noteId = identifier
                this.options.modal.notes.showModal = true
            },
            closeNoteModal(){
                this.options.modal.notes.showModal = false
            },
            getNote(identifier){
                let index = this.notes.findIndex(
                    (item) => item.id === identifier
                );
                return this.notes[index]
            }
        }
    }
</script> -->

<style scoped>
@import "../components/Notes/notes.css";
</style>
