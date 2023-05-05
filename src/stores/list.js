import { defineStore } from "pinia"
import { uuid4 as gId } from "uuid4"

export const storeList = defineStore("list", {
    state: () => ({
        categories: [],
        items: [],
        categoryId: 0,
        itemId: 0,
        identifier: ''
    }),
    getters: {
        getAllCategories: (state) => {
            return state.categories
        },
        getAllItems: (state) => {
            return state.items
        },
        getCategory: (state) => (categoryId) => {
            const category = state.categories.filter((item) => item.id === categoryId)
            return category
        },
        getItem: (state) => (itemId) => {
            const item = state.items.filter((itm) => itm.id === itemId)
            return item
        },
        getCategoriesLength: (state) => {
            return state.categories.length
        },
        getItemsLength: (state) => {
            return state.items.length
        },
        getCategoryColor: (state) => (identifier) =>{
            const color = state.categories.filter((item) => item.id === identifier)
            return color
        },
        getCategoryName: (state) => (identifier) =>{
            const name = state.categories.filter((item) => item.id === identifier)
            return name
        },
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
				isPinned: false,
				isDragging: false
			}
			this.categories.push(obj)
        },
		removeCategory(identifier) {
			let index = this.categories.findIndex(
				(item) => item.id === identifier
			)
			this.categories.splice(index, 1);
		},
        updateCategoryName(identifier, name){
            let index = this.categories.findIndex(
				(item) => item.id === identifier
			)
            this.categories[index].name = name
        },
        updateCategoryColor(identifier, color){
            let index = this.categories.findIndex(
				(item) => item.id === identifier
			)
            this.categories[index].color = color
        },
        updateCategoryPin(identifier, pin){
            let index = this.categories.findIndex(
				(item) => item.id === identifier
			)
            this.categories[index].isPinned = pin
        },


        /* Items */
        addItem(categoryValue){
            this.items.push({
                id: this.createId(), 
                text: 'Edit this text', 
                category: categoryValue, 
                isChecked: false
            })
        },
        removeItem(identifier){
            let index = this.items.findIndex(item => item.id === identifier)
            this.items.splice(index, 1)
        },
        updateItem(identifier, text, isChecked){
            const index = this.items.findIndex(item => item.id === identifier)
            this.items[index].text = text
            this.items[index].isChecked = isChecked
        },
        updateItemCategory(identifier, newCategory){
            const index = this.items.findIndex(item => item.id === identifier)
            this.items[index].category = newCategory
        },
        updateItemText(identifier, newText){
            const index = this.items.findIndex(item => item.id === identifier)
            this.items[index].text = newText
        },
        updateItemChecked(identifier, newCheck){
            const index = this.items.findIndex(item => item.id === identifier)
            this.items[index].isChecked = newCheck
        },

        /** Load data */
        loadCategoriesFromLocal() {
			const categoriesFromLocal = localStorage.getItem("lists-categories");
			if (categoriesFromLocal && JSON.parse(categoriesFromLocal).length > 0) {
				this.categories = JSON.parse(categoriesFromLocal);
			}else{
                this.addCategory()
            }
		},
		loadItemsFromLocal() {
			const ItemsFromLocal = localStorage.getItem("lists-items");
			if (ItemsFromLocal) {
				this.items = JSON.parse(ItemsFromLocal);
			}
		},
        saveCategories(){
            localStorage.setItem("lists-categories", JSON.stringify(this.categories));
        },
        saveItems(){
            localStorage.setItem("lists-categories", JSON.stringify(this.items));
        },
		cleanTrash() {
			this.items.map((item, index) => {
				let exists = false;
				this.categories.map((cat) => {
					if (item.category === cat.id) {
						exists = true
					}
				});
				if (!exists) {
					this.items.splice(index, 1)
				}
			});
		}
    }
})