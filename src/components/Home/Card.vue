<template lang="">
    <div class="card">
        <div class="card-title">
            <p>{{ properties.title }}</p>
        </div>
        <div class="card-description">
            {{ properties.description }}
        </div>
        <div class="card-image">
            <i 
            class="card-icon"
            :class="properties.icon"
            ></i>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        properties: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
    @import './card.css'
</style>