<template>
    <div 
    class="note"
    >
        <!-- En el div de arriba pondremos un onclick que haga un emit al View y muestre la información de la nota -->
                
        <div class="note-header">

            <div class="note-title">
                <p class="title-text">{{ properties.title }}</p>
            </div>

            <div class="note-menu">
                <div class="note-menu-item" v-if="properties.isPinned">
                    <i class="title-img bi bi-pin-angle-fill" @click="togglePinned()"></i>
                </div>
                <div class="note-menu-item" v-else>
                    <i class="title-img bi bi-pin-angle" @click="togglePinned()"></i>
                </div>
                <div class="note-menu-item">
                    <i class="bi bi-three-dots-vertical" @click="toggleContext()"></i>
                </div>
            </div>

        </div>

        <div class="note-content">
            <p class="content-text">{{ `${properties.content.substring(0, 700)}...` }}</p>
        </div>

        <div class="note-categories" v-if="properties.categories.length">
            <div 
                class="note-category" 
                v-if="properties.categories.length > 0" 
                v-for="cat in properties.categories"
                :style="{'color': getCategoryColor(cat), 'borderColor': getCategoryColor(cat)}"
                >
                <span class="category-text">{{ getCategoryName(cat) }}</span>
            </div>
        </div>

        <div class="note-context" v-if="properties.showContext" @mouseleave="toggleContext()">
            <div class="context-item" @click="removeNote(properties.id)">
                <i class="context-icon bi bi-dash-circle"></i>
                <span class="context-text">Remove</span>
            </div>
            <div class="context-item" @click="openModal(properties.id)">
                <i class="context-icon bi bi-pencil"></i>
                <span class="context-text">Edit</span>
            </div>
        </div>

    </div>

</template>

<script>

    export default {
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
        methods: {
            togglePinned(){
                this.properties.isPinned = !this.properties.isPinned
            },
            toggleContext(){
                this.properties.showContext = !this.properties.showContext
            },
            removeNote(identifier){
                this.$emit('removeNote', identifier)
                this.toggleContext()
            },
            openModal(identifier){
                this.$emit('openModal', identifier)
                this.toggleContext()
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
        emits: ['removeNote', 'openModal']
    }

</script>

<style scoped>
    @import './note.css'    
</style>