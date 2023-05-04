<script setup>
	import { defineProps } from "vue"
	import { storeList } from "../../stores/list"

	const store = storeList()

	const props = defineProps({
		propiedades: {
			type: Object,
			required: true,
		},
		catColor: {
			type: String,
			required: true,
		},
	})

	/* Items */
	const updateText = (text) => {
		store.updateItemText(props.propiedades.id, text)
	}
	const removeItem = () => {
		store.removeItem(props.propiedades.id)
	}
	const updateChecked = () => {
		store.updateItemChecked(props.propiedades.id, !props.propiedades.isChecked)
	}
	const keyManagement = (eKey, eTxt) => {
		if (eKey.key === "Enter") {
			store.updateItemText(props.propiedades.id, eTxt)
			eKey.target.blur()
		}
	}
</script>

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
				v-model="propiedades.isChecked"
				@click="updateChecked()"
			/>
		</div>
		<div class="item-text">
			<div v-if="propiedades.isChecked">
				<span class="checkedStyle">{{ propiedades.text }}</span>
			</div>
			<div v-else>
				<input
					type="text"
					:value="propiedades.text"
					@focusout="updateText($event.target.value)"
					@keypress="keyManagement($event, $event.target.value)"
					@keydown.tab="keyManagement($event, $event.target.value)"
					:style="{ borderColor: catColor, color: catColor }"
					class="input-text"
				/>
			</div>
		</div>
		<div class="item-context">
			<i class="context-img bi bi-dash-circle" @click="removeItem()"></i>
		</div>
	</div>
</template>

<style scoped>
	@import "./item.css";
</style>
