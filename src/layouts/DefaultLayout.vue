<script setup lang="ts">

import AppHeader from "../components/AppHeader.vue";
import {useRouter} from "vue-router";

const router = useRouter()

const handleClick = () => {
	router.push({ name: 'Home' })
}

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

</style>