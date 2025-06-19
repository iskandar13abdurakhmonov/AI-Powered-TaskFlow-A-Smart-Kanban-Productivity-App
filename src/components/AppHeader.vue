<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()

const gotoKanban = () => {
	router.push({ name: 'Home'})
}
</script>

<template>
	<h1 class="font-bold mt-10">Task Board</h1>
	<n-button @click="gotoKanban">Go to Kanban</n-button>
</template>

<style scoped>

</style>