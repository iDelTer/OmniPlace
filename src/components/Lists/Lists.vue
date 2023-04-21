<template>
	<div id="list-box">
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
                    {id: 4, text: 'Texto 5', category: 0},
                    {id: 5, text: 'Texto 6', category: 2},
                    {id: 6, text: 'Texto 7', category: 3}
                ],
                categories: [
                    {id: 0, name: 'Hogar', color: '#09ddf2'},
                    {id: 1, name: 'Ocio', color: '#ee1cfa'},
                    {id: 2, name: 'Trabajo', color: '#000000'},
                    {id: 3, name: 'Estudios', color: '#ff0000'}
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
