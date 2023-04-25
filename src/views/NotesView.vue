<script setup>
    import { uuid4 as gId } from "uuid4";
</script>

<template>

    <div id="list-menu">

		<div class="menu-item">
			<div class="menu-icon">
				<i class="title-img bi bi-plus-circle"></i>
			</div>
			<div class="menu-text">
				<span>New Note</span>
			</div>
        </div>

        <div class="menu-item" @click="togglePinned()">
			<div class="menu-icon">
				<i class="title-img bi bi-pin-angle"></i>
			</div>
			<div class="menu-text">
				<span>Toggle Pins</span>
			</div>
		</div>

        <div class="menu-item" @click="onlyPinned()">
			<div class="menu-icon">
				<i class="title-img bi bi-pin-angle-fill"></i>
			</div>
			<div class="menu-text">
				<span>Only Pins</span>
			</div>
		</div>

	</div>

    <div id="notes-box" v-if="showPinned">

        <div id="pinned-box">
            <Card
                v-for="card in cards"
                :properties="card"
            />
        </div>

        <div id="notpinned-box" v-if="!onlyPinned">
            <Card
                v-for="card in cards"
                :properties="card"
            />
        </div>
	</div>

	<div id="notes-box" v-else>
        <Card
            v-for="card in cards"
            :properties="card"
        />
	</div>
		<!-- 
            Al editar ->

            div Modal
                div menu
                    img close
                div title
                    input text title
                div text
                    input text text
                div categories
                    div
                        span category
                    div
                        select (show only now selected)
        -->
</template>

<script>
    import Note from "../components/Notes/Note.vue"

	export default {
        components: {
            Note
        },
        data(){
            return {
                option: {
                    showPinned: false,
                    onlyPinned: false
                },
                categories: [],
                notes: [],
                category: {
                    id: '',
                    name: '',
                    color: ''
                },
                note: {
                    id: '',
                    title: '',
                    content: '',
                    categories: Array,

                }
            }
        },
        methods: {
            createId() {
                let id = gId();
                gId.valid(id);
                return id;
            },
            addCategory() {
                let obj = {
                    id: this.createId(),
                    name: "Edit Name",
                    color: "#000000"
                };
                this.categories.push(obj);
            },
            addNote(){
                let obj = {
                    id: this.createId(),
                    title: 'Título',
                    content: 'Start writing this note!',
                    categories: []
                }
                this.notes.push(obj)
            },
            removeCategory(identifier){
                let index = this.categories.findIndex(
                    (item) => item.id === identifier
                );
                this.categories.splice(index, 1);
            },
            removeNote(identifier){
                let index = this.notes.findIndex(
                    (item) => item.id === identifier
                );
                this.notes.splice(index, 1);
            },
            togglePinned(){
                this.options.showPinned = !this.options.showPinned;
            },
            onlyCheckeds(){
                this.options.onlyPinned = !this.options.onlyPinned
                this.options.showPinned = !this.options.onlyPinned
            }
        }
    }
</script>

<style scoped>
    @import '../components/Notes/notes.css'
</style>