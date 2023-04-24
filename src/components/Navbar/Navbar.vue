<script setup></script>

<template>
	<div class="navbar">
		<div class="nav-logo">
			<p>
				<span class="title-text title-first">Omni</span
				><span class="title-text title-second">Place</span>
			</p>
		</div>
		<div class="nav-apps nav-icons">
			<div class="apps-icon">
				<i class="nav-icon bi bi-book"></i>
				<span>Notas</span>
			</div>
			<div class="apps-icon">
				<i class="nav-icon bi bi-card-checklist"></i>
				<span>Lista</span>
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
