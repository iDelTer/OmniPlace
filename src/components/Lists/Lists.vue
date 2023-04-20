<template>
	<div class="list-box">
        <Category 
        v-for="category in categories" 
        :propiedad="category"
        :propItems="items"/>
		<!--
            div category (cada bloque sería una categoría) (hacer un for)
                div
                    btn
                    input
        -->
	</div>
</template>

<script>
    import Item from "./Item.vue";
	import Category from "./Category.vue"

	export default {
		components: {
			Category
		},
		data() {
			return {
                items: [
                    {id: 0, text: 'Texto 1', category: 0},
                    {id: 1, text: 'Texto 2', category: 0},
                    {id: 2, text: 'Texto 3', category: 1},
                    {id: 3, text: 'Texto 4', category: 1},
                    {id: 4, text: 'Texto 5', category: 0}
                ],
                categories: [
                    {id: 0, name: 'Hogar', color: '#ffffff'},
                    {id: 1, name: 'Ocio', color: '#e5e6e5'}
                ]
            }
		},
        methods: {

        }
	}
	/* 
        Para saber cuál es la última ID, guardar en localStorage la ID, y cada vez que se cree un item nuevo, añadir +1. Aunque se elimine un item, nunca se vuelve atrás o se resta uno
    */
</script>

<style>
    @import './list.css'
</style>
