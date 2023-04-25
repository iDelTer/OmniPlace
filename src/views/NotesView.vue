<script setup>
    import { uuid4 as gId } from "uuid4"
</script>

<template>

    <div id="notes-menu">

		<div class="menu-item" @click="addNote()">
			<div class="menu-icon">
				<i class="title-img bi bi-plus-circle"></i>
			</div>
			<div class="menu-text">
				<span>New Note</span>
			</div>
        </div>

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
				<p class="list-box-title"><i class="bi bi-pin-angle-fill"></i></p>
			</div>

            <template v-for="note in notes">
                <Note
                :key="note.id"
                v-if="note.isPinned"
                :properties="note"
                :categories="categories"
                @removeNote="removeNote(note.id)"
                @openModal="openModal(note.id)"
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
                @openModal="openModal(note.id)"
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
        v-if="options.modal.showModal"
        :properties="getNote(options.modal.noteId)"
        :categories="categories"
        @closeModal="closeModal()"
    />
		<!-- 
            Al editar ->

            div Modal
                div menu
                    img close
                div title
                    input text title
                div text
                    input text text
                div categories
                    div
                        span category
                    div
                        select (show only now selected)
        -->
</template>

<script>
    import Note from "../components/Notes/Note.vue"
    import Note_Modal from "../components/Modals/Note_Modal.vue";

	export default {
        components: {
            Note
        },
        data(){
            return {
                options: {
                    showPinned: true,
                    onlyPinned: false,
                    modal: {
                        showModal: false,
                        noteId: ''
                    }
                },
                categories: [
                    {id: this.createId(), name: 'Nombresito', color: '#ffffff'},
                    {id: this.createId(), name: 'Nombresita', color: '#000000'},
                    {id: this.createId(), name: 'El nombre', color: '#e3e4e5'}
                ],
                notes: [],
                category: {
                    id: '',
                    name: '',
                    color: ''
                },
                note: {
                    id: '',
                    title: '',
                    content: '',
                    categories: Array,
                    isPinned: false,
                    showContext: false
                }
            }
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
                    color: "#000000"
                };
                this.categories.push(obj);
            },
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
            addCategory(){
                // Crea una nueva categoría
                // Abre una modal que muestra todas las categorías
                let obj = {
                    id: this.createId(),
                    title: 'New note',
                    content: 'Start writing this note!',
                    categories: [],
                    isPinned: false,
                    showContext: false
                }
                this.categories.push(obj)
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
            togglePinned(){
                this.options.showPinned = !this.options.showPinned;
            },
            onlyCheckeds(){
                this.options.onlyPinned = !this.options.onlyPinned
                this.options.showPinned = !this.options.onlyPinned
            },
            openModal(identifier){
                this.options.modal.noteId = identifier
                this.options.modal.showModal = true
            },
            closeModal(){
                this.options.modal.showModal = false
            },
            loadCategoriesFromLocal() {
                const categoriesFromLocal = localStorage.getItem("notes-categories");
                if (categoriesFromLocal) {
                    this.categories = JSON.parse(categoriesFromLocal);
                }
            },
            loadNotesFromLocal() {
                const NotesFromLocal = localStorage.getItem("notes-note");
                if (NotesFromLocal) {
                    this.notes = JSON.parse(NotesFromLocal);
                }
            },
            getNote(identifier){
                let index = this.notes.findIndex(
                    (item) => item.id === identifier
                );
                return this.notes[index]
            }
        },
        watch: {
            categories: {
                handler: (newItems) => {
                    localStorage.setItem("notes-categories", JSON.stringify(newItems))
                },
                deep: true
            },
            notes: {
                deep: true,
                handler: (newVal) => {
                    const watch = newVal.map(({ id, title, content, categories, isPinned }) => ({
                        id,
                        title,
                        content,
                        categories,
                        isPinned
                    }))
                    localStorage.setItem("notes-note", JSON.stringify(watch))
                }
            }
        },
        mounted() {
            this.loadCategoriesFromLocal()
            this.loadItemsFromLocal()
        }
    }
</script>

<style scoped>
    @import '../components/Notes/notes.css'
</style>