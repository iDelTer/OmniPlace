<template>
  <div
    class="item-box"
    :key="propiedades.id"
    :style="{ borderColor: catColor, color: catColor }"
  >
    <div class="item-check">
        <input 
            type="checkbox" 
            class="input-check"
            :style="{borderColor: catColor}"
        />
    </div>
    <div class="item-text">
        <input 
        type="text" 
        :value="propiedades.text"
        @focusout="updateText($event.target.value)"
        :style="{ borderColor: catColor }"
        class="input-text">
    </div>
    <div class="item-context">
        <i 
        class="context-img bi bi-dash-circle" 
        @click="remove()"></i>
    </div>
  </div>
</template>

<script>
    export default {
        props: {
            propiedades: {
                type: Object,
                required: true,
            },
            catColor: {
                type: String,
                required: true,
            },
        },
        methods: {
            updateText(text){
                this.propiedades.text = text
            },
            remove(){
                this.$emit('removeItem', this.propiedades.id)
            }
        },
        emits: ['removeItem']
    };
</script>

<style>
    @import "./item.css";
</style>
