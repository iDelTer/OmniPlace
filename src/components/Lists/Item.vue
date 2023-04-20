<template>
    <div class="item-box" :key="propiedades.id">
        <div class="item-check">
            <input type="checkbox" class="input-check">
        </div>
        <div class="item-text">{{ propiedades.text }}</div>
    </div>
</template>

<script>
    export default {
        props: {
            propiedades: {
                type: Object,
                required: true
            }
        },
        methods: {
        }
    }
</script>

<style>
    @import './item.css'
</style>