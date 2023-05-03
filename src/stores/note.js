import { defineStore } from "pinia"
import { uuid4 as gId } from "uuid4"
import { watch } from 'vue'

export const storeNote = defineStore("note", {
    state: () => ({
        categories: [],
        notes: [],
        categoryId: 0,
        noteId: 0
    }),
    getters: {
        getAllCategories: (state) => {
            return state.categories
        },
        getAllNotes: (state) => {
            return state.notes
        },
        getCategory: (state) => (categoryId) => {
            const category = state.categories.filter((item) => item.id === categoryId)
            return category
        },
        getNote: (state) => (noteId) => {
            const note = state.notes.filter((item) => item.id === noteId)
            return note
        },
        getCategoriesLength: (state) => {
            return state.categories.length
        },
        getNotesLength: (state) => {
            return state.notes.length
        }
    },
    actions: {
        createId() {
			let id = gId()
			gId.valid(id)
			return id
		},


        /* Categories */
        addCategory(){
            let obj = {
                id: this.createId(),
                name: "Edit Name",
                color: "#000000",
            }
            this.categories.push(obj)
            console.log(`Se ha creado una nueva categoría ${obj.id}`)
        },
        removeCategory(identifier){
            let index = this.categories.findIndex(
                (item) => item.id === identifier
            )
            this.categories.splice(index, 1);
        },
        updateCategoryColor(index, color){
            this.categories[index].color = color
        },
        updateCategoryName(index, name){
            this.categories[index].name = name
        },


        /* Notes */
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
            console.log(this.notes)
        },
        removeNote(identifier){
            let index = this.notes.findIndex(
                (item) => item.id === identifier
            )
            this.notes.splice(index, 1);
        },

        /** Load data */
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
        saveCategories(){
            localStorage.setItem("notes-categories", JSON.stringify(this.categories))
        },
        saveNotes(){
            localStorage.setItem("notes-notes", JSON.stringify(this.notes))
        }
    }
})