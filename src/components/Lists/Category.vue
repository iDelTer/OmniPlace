<script setup>
    import Item from './Item.vue';
</script>

<template>
    <div :key="propiedad.id" class="category-box">

        <div 
        class="category-title" 
        :style="{borderColor: propiedad.color}">
            <div class="title-text-box">
                <span 
                class="title-text" 
                :style="{color: propiedad.color}">{{ propiedad.name }}</span>
            </div>
            <div class="title-img-box">
                <img 
                src="../../../public/add.png" 
                class="title-img"
                @click="addItem(propiedad.id)"
                >
            </div>
        </div>

        <div 
        class="item" v-for="item in propItems" >
            <Item
            v-if="item.category === propiedad.id"
            :propiedades="item"
            :catColor="String(propiedad.color)"
            @removeItem="removeItem(item.id)"
            />
        </div>

    </div>
</template>

<script>
    export default {
        components: {
            Item
        },
        props: {
            propiedad: {
                type: Object,
                required: true
            },
            propItems: {
                type: Array,
                required: true
            }
        },
        data(){
            return {
            }
        },
        methods: {
            removeItem(identifier){
                let index = this.propItems.findIndex(item => item.id === identifier)
                this.propItems.splice(index, 1)
            },
            addItem(categoryValue){
                this.propItems.push({id: Math.floor(Math.random() * 1000000 + 1000), text: 'Edit this text', category: categoryValue})
            }
        }
    }
</script>

<style>
    @import './category.css'
</style>