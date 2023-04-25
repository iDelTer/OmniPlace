<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
	<!--
		Iconos para el theme change
			Sol
				- https://icons.getbootstrap.com/icons/cloud-sun/
				- https://icons.getbootstrap.com/icons/cloud-sun-fill/
			Luna
				- https://icons.getbootstrap.com/icons/cloud-moon/
				- https://icons.getbootstrap.com/icons/cloud-moon-fill/
	-->
	<div class="navbar">
		<div class="nav-logo">
			<p>
				<RouterLink to="/">
					<span class="title-text title-first">Omni</span>
					<span class="title-text title-second">Place</span>
				</RouterLink>
			</p>
		</div>
		<div class="nav-apps nav-icons">
			<div class="apps-icon">
				<RouterLink to="/notes">
					<i class="nav-icon bi bi-book"></i>
					<span>Notas</span>
				</RouterLink>
			</div>
			<div class="apps-icon">
				<RouterLink to="/lists">
					<i class="nav-icon bi bi-card-checklist"></i>
					<span>Lista</span>
				</RouterLink>
			</div>
		</div>
		<div class="nav-settings nav-icons">
			<div class="settings-icon">
				<i class="nav-icon bi bi-gear"></i>
			</div>
			<div class="settings-icon">
				<i class="nav-icon bi bi-person-circle"></i>
			</div>
		</div>
	</div>
</template>

<script>
	export default {}
</script>

<style scoped>
	@import "./navbar.css";
</style>
