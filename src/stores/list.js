import { defineStore } from "pinia"
import { uuid4 as gId } from "uuid4"

export const storeList = defineStore("list", {
    state: () => ({
        categories: [],
        items: [],
        categoryId: 0,
        itemId: 0
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
				isPinned: false,
				isDragging: false
			}
			thiste.categories.push(obj)
        },
		removeCategory(identifier) {
			let index = this.categories.findIndex(
				(item) => item.id === identifier
			)
			this.categories.splice(index, 1);
		},
        updateCategory(index, name, color, isPinned){
            this.categories[index].name = name
            this.categories[index].color = color
            this.categories[index].isPinned = isPinned
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
        updateItem(index, text, isChecked){
            this.items[index].text = text
            this.items[index].isChecked = isChecked
        },

        /** Load data */
        loadCategoriesFromLocal() {
			const categoriesFromLocal = localStorage.getItem("lists-categories");
			if (categoriesFromLocal) {
				this.categories = JSON.parse(categoriesFromLocal);
			}
		},
		loadItemsFromLocal() {
			const ItemsFromLocal = localStorage.getItem("lists-items");
			if (ItemsFromLocal) {
				this.items = JSON.parse(ItemsFromLocal);
			}
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