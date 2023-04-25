<script setup>
    import { RouterLink } from 'vue-router'
</script>

<template>
    <div id="cards-box">
        <RouterLink 
        v-for="card in cards"
        :to="card.path"
        >
            <Card
                :properties="card"
            />
        </RouterLink>
    </div>
</template>

<script>
import Card from "../components/Home/Card.vue";

export default {
    components: {
        Card
    },
    data() {
        return{
            cards: [
                {title: 'Notes', description: 'Create notes and customize them', icon: 'bi bi-book', path: '/notes'},
                {title: 'Lists', description: 'Create your own lists and customize them', icon: 'bi bi-card-checklist', path: '/lists'}
            ],
            card: {
                title: "",
                description: "",
                icon: "",
                path: ""
            }
        }
    }
}

</script>

<style scoped>
    @import '../components/Home/home.css'
</style>