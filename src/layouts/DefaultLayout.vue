<script setup lang="ts">
import AppHeader from "../components/AppHeader.vue";

</script>

<template>
	<div class="layout">
		<AppHeader />
		<div class="content">
			<main>
				<router-view/>
			</main>
		</div>
	</div>
</template>

<style scoped>
.layout {
	width: 100%;
	min-height: 100vh;
	margin: 0 auto;
	padding: 0 15px;

	/* Mobile first approach */
	@media (min-width: 768px) {
		padding: 0 20px;
	}

	@media (min-width: 1024px) {
		padding: 0 30px;
	}

	@media (min-width: 1440px) {
		max-width: 1839px;
		padding: 0 15px;
	}
}

.content {
	width: 100%;
	overflow-x: auto; /* Allow horizontal scrolling on small screens */
}

main {
	width: 100%;
	min-width: fit-content;
}
</style>