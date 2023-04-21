<script setup>
    import Item from './Item.vue'
    import { uuid4 as gId }  from 'uuid4'
</script>

<template>
    <div :key="propiedad.id" class="category-box">

        <div 
        class="category-title" 
        :style="{borderColor: propiedad.color}">
            <div class="title-text-box">
                <input 
                type="text"
                class="title-text"
                :value="propiedad.name"
                :style="{ borderColor: propiedad.color, color: propiedad.color }"
                @focusout="updateCatName($event.target.value)"
                >
            </div>
            <div 
            class="title-img-box" 
            :style="{color: propiedad.color}">
                <!-- <i 
                class="title-img bi bi-pencil"
                ></i> -->
                <div class="title-img-item">
                    <input 
                    type="color" 
                    class="title-color"
                    v-model="propiedad.color"
                    @blur="updateCatColor(propiedad.color)">
                </div>
                <div class="title-img-item">
                    <i
                    class="title-img bi bi-plus-circle"
                    @click="addItem(propiedad.id)"></i>
                </div>
                <div class="title-img-item">
                    <i
                    class="title-img bi bi-dash-circle"
                    @click="removeCategory()"></i>
                </div>
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
                this.propItems.push({id: this.createId(), text: 'Edit this text', category: categoryValue})
            },
            createId(){
                let id = gId()
                gId.valid(id)
                return id
            },
            updateCatName(t){
                this.propiedad.name = t
            },
            updateCatColor(newColor){
                console.log(newColor)
                this.propiedad.color = newColor
                console.log(this.propiedad.color)
            },
            removeCategory(){
                this.$emit('removeCategory', String(this.propiedad.id))
            }
        }
    }
</script>

<style>
    @import './category.css'
</style>