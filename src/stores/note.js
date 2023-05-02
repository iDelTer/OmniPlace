import { defineStore } from "pinia"
import { uuid4 as gId } from "uuid4"

export const storeList = defineStore("list", {
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
            )
            this.categories.splice(index, 1);
        },
        updateCategory(index, name, color){
            this.categories[index].name = name
            this.categories[index].color = color
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
        }
    }
})