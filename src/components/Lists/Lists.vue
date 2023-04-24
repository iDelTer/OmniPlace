<script setup>
import { reactive } from "vue";
import { uuid4 as gId } from "uuid4";
</script>

<template>
  <div id="list-menu">
    <div class="menu-item" @click="addCategory()">
      <div class="menu-icon">
        <i class="title-img bi bi-plus-circle"></i>
      </div>
      <div class="menu-text">
        <span>Category</span>
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
  </div>

  <template v-if="this.showPinned" v-for="category in categories">

	<div id="pinned-box" v-if="category.isPinned">

		<Category
		:propiedad="category"
		:propItems="items"
		@removeCategory="removeCategory(category.id)"
		@draggingStarted="draggingStarted()"
		@draggingFinished="draggingFinished()"
		/>

	</div>

	<div id="notpinned-box" v-else>

		<Category
		:propiedad="category"
		:propItems="items"
		@removeCategory="removeCategory(category.id)"
		@draggingStarted="draggingStarted()"
		@draggingFinished="draggingFinished()"
		/>

	</div>

  </template>

  <template v-else>

	<div id="list-box">

		<Category
		v-for="category in categories"
		:propiedad="category"
		:propItems="items"
		@removeCategory="removeCategory(category.id)"
		@draggingStarted="draggingStarted()"
		@draggingFinished="draggingFinished()"
		/>

	</div>

  </template>

  <!-- <div id="list-box">

	<Category
      v-for="category in categories"
      :propiedad="category"
      :propItems="items"
      @removeCategory="removeCategory(category.id)"
      @draggingStarted="draggingStarted()"
      @draggingFinished="draggingFinished()"
    />

  </div> -->
    
</template>

<script>
import Category from "./Category.vue";

export default {
  components: {
    Category,
  },
  data() {
    return {
      items: [],
      categories: [],
      showPinned: true,
    };
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
        color: "#000000",
        isDragging: false,
        isPinned: false,
      };
      this.categories.push(obj);
    },
    removeCategory(identifier) {
      let index = this.categories.findIndex((item) => item.id === identifier);
      this.categories.splice(index, 1);
    },
    togglePinned() {
      this.showPinned = !this.showPinned;
    },
    draggingStarted() {
      this.categories.map((c) => {
        c.isDragging = true;
      });
      document.body.style.cursor = "dragging";
    },
    draggingFinished() {
      this.categories.map((c) => {
        c.isDragging = false;
      });
      document.body.style.cursor = "auto";
    },
    loadCategoriesFromLocal() {
      const categoriesFromLocal = localStorage.getItem("categories");
      if (categoriesFromLocal) {
        this.categories = JSON.parse(categoriesFromLocal);
      }
    },
    loadItemsFromLocal() {
      const ItemsFromLocal = localStorage.getItem("items");
      if (ItemsFromLocal) {
        this.items = JSON.parse(ItemsFromLocal);
      }
    },
    cleanTrash() {
      this.items.map((item, index) => {
        let exists = false;
        this.categories.map((cat) => {
          if (item.category === cat.id) {
            exists = true;
          }
        });
        if (!exists) {
          this.items.splice(index, 1);
        }
      });
    },
  },
  watch: {
    categories: {
      deep: true,
      handler: (newVal) => {
        const watch = newVal.map(({ id, name, color, isPinned }) => ({
          id,
          name,
          color,
          isPinned,
        }));
        localStorage.setItem("categories", JSON.stringify(watch));
      },
    },
  },
  mounted() {
    this.loadCategoriesFromLocal();
    this.loadItemsFromLocal();
    this.cleanTrash();
  },
};
</script>

<style>
@import "./list.css";
</style>
