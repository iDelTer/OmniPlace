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
            v-model="propiedades.isChecked"
            @click="changeChecked()"
        />
    </div>
    <div class="item-text">
        <div v-if="propiedades.isChecked">
            <span class="italic">{{ propiedades.text }}</span>
        </div>
        <div v-else>
            <input 
            type="text" 
            :value="propiedades.text"
            @focusout="updateText($event.target.value)"
            @keypress="keyManagement($event, $event.target.value)"
            @keydown.tab="keyManagement($event, $event.target.value)"
            :style="{ borderColor: catColor, color: catColor }"
            class="input-text">
        </div>
        
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
            },
            changeChecked(){
                this.propiedades.isChecked = !this.propiedades.isChecked
            },
            keyManagement(eKey, eTxt){
                if(event.key === "Enter"){
                    this.updateText(eTxt)
                    event.target.blur()
                }
            }
            
        },
        emits: ['removeItem']
    };
</script>

<style>
    @import "./item.css";
</style>
