<template>
    <div :key="propiedad.id" class="category-box">

        <div 
        class="category-title" 
        style="{border-color: propiedad.color}">
            <p 
            class="title-text" 
            style="{color: propiedad.color}">{{ propiedad.name }}</p>
        </div>

        <div 
        class="items-box">
            <Item 
            v-for="item in propItems"
            :propiedades="item"
            />
        </div>

    </div>
</template>

<script>
    import Item from './Item.vue';
    export default {
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
        mounted() {
        }
    }
</script>

<style>
    @import './category.css'
</style>