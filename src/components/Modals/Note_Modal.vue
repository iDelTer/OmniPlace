<template>

    <div class="modal">

        <div 
            class="modal-background"
            @click="closeNoteModal()"
        >

        </div>

        <div class="modal-container">
            
            <div class="modal-title">
                <input type="text" :value="properties.title" @blur="saveTitle">
            </div>

            <div class="modal-content">
                <textarea @blur="saveContent">{{ properties.content }}</textarea>
            </div>

            <div class="modal-menu">

                <div class="menu-categories">
                    
                    <div class="selected-categories">
                        <div
                            v-for="noteCat in properties.categories"
                            class="selection"
                            :style="{'color': getCategoryColor(noteCat), 'border-color': getCategoryColor(noteCat)}"
                        >
                            <span class="selected-text">{{ getCategoryName(noteCat) }}</span>
                            <i 
                            class="context-img bi bi-dash-circle" 
                            @click="removeCategoryFromItem(noteCat)"></i>
                        </div>
                    </div>

                    <div 
                    class="selector">
                        <span class="selector-text">SELECT CATEGORY</span>
                        <select 
                        v-model="selected"
                        @change="addCategoryToNote"
                        >
                            <option
                            v-for="category in categories"
                            :value="category.id"
                            >{{ category.name }}</option>
                        </select>
                    </div>

                </div>

                <div class="menu-context">
                    
                    <!--Agregar borrar, copiar etc-->

                </div>

            </div>

        </div>

    </div>

</template>

<script>
    export default{
        props: {
            properties: {
                type: Object,
                required: true
            },
            categories: {
                type: Array, 
                required: true
            }
        },
        data() {
            return {
                selected: '',
                noteCat: {
                    id: '',
                    name: '',
                    color: ''
                }
            }
        },
        methods: {
            closeNoteModal(){
                this.$emit('closeNoteModal')
            },
            saveTitle(event){
                this.properties.title = event.target.value
            },
            saveContent(event){
                this.properties.content = event.target.value
            },
            addCategoryToNote(event){
                let identifier = event.target.value
                if(this.properties.categories.includes(identifier)) return
                this.properties.categories.push(identifier)
            },
            removeCategoryFromItem(identifier){
                let index = this.properties.categories.findIndex(
                    (item) => item.id === identifier
                );
                this.properties.categories.splice(index, 1);
            },
            getCategoryName(identifier){
                for (let i = 0; i < this.categories.length; i++) {
                    if (this.categories[i].id === identifier) {
                        return this.categories[i].name
                    }
                }
            },
            getCategoryColor(identifier){
                for (let i = 0; i < this.categories.length; i++) {
                    if (this.categories[i].id === identifier) {
                        return this.categories[i].color
                    }
                }
                return ''
            }
            
        },
        emits: [
            'closeNoteModal'
        ],
        mounted(){
            this.leftCategories = this.categories
        }
    }
</script>

<style scoped>
    @import './modals.css';
    @import './Note_modal.css';
</style>