import { defineStore } from "pinia"
import { uuid4 as gId } from "uuid4"
import { watch } from 'vue'

export const storeNote = defineStore("note", {
    state: () => ({
        categories: [],
        notes: [],
        categoryId: '',
        noteId: '',
        identifier: ''
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
            console.log(`Nota es: ${JSON.stringify(note)}`)
            return note
        },
        getCategoriesLength: (state) => {
            return state.categories.length
        },
        getNotesLength: (state) => {
            return state.notes.length
        },
        getCategoryColor: (state) => (identifier) =>{
            const category = state.categories.filter((item) => item.id === identifier)
            return category
        },
        getCategoryName: (state) => (identifier) =>{
            const category = state.categories.filter((item) => item.id === identifier)
            return category
        },
    },
    actions: {
        /* General */
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
            console.log(`Se ha eliminado la categoría ${identifier}`)
        },
        updateCategoryColor(identifier, color){
            const index = this.categories.findIndex(item => item.id === identifier)
            this.categories[index].color = color
            console.log(`Color de la categoría cambiado a: ${this.categories[index].color}`)
        },
        updateCategoryName(identifier, name){
            const index = this.categories.findIndex(item => item.id === identifier)
            this.categories[index].name = name
            console.log(`Nombre de la categoría cambiado a: ${this.categories[index].name}`)
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
            console.log(`Se ha añadido una nueva nota ${this.notes}`)
        },
        removeNote(identifier){
            let index = this.notes.findIndex(
                (item) => item.id === identifier
            )
            this.notes.splice(index, 1);
            console.log(`Se ha eliminado la nota: ${identifier}`)
        },

        /** Load data */
        loadCategoriesFromLocal() {
            const categoriesFromLocal = localStorage.getItem("notes-categories");
            if (categoriesFromLocal && JSON.parse(categoriesFromLocal).length > 0) {
                this.categories = JSON.parse(categoriesFromLocal);
            }else{
                this.addCategory()
            }
        },
        loadNotesFromLocal() {
            const NotesFromLocal = localStorage.getItem("notes-note");
            if (NotesFromLocal && JSON.parse(NotesFromLocal).length > 0) {
                this.notes = JSON.parse(NotesFromLocal)
            }else{
                this.addNote()
            }
        },
        saveCategories(){
            localStorage.setItem("notes-categories", JSON.stringify(this.categories))
        },
        saveNotes(){
            localStorage.setItem("notes-note", JSON.stringify(this.notes))
        }
    }
})