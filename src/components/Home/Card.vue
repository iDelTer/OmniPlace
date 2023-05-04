<script setup>
    import { defineProps } from "vue"

    const props = defineProps({
        properties: {
            type: Object,
            required: true
        }
    })
</script>

<template lang="">
    <div class="card">
        <div class="card-title">
            <p>{{ props.properties.title }}</p>
        </div>
        <div class="card-description">
            {{ props.properties.description }}
        </div>
        <div class="card-image">
            <i 
            class="card-icon"
            :class="props.properties.icon"
            ></i>
        </div>
    </div>
</template>

<style scoped>
    @import './card.css'
</style>