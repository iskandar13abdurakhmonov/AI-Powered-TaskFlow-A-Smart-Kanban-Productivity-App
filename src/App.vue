<script setup>
import {ref} from 'vue'

const theme = ref(null)


</script>

<template>
	<n-config-provider :theme="theme">
		<n-message-provider>
			<router-view />
		</n-message-provider>
	</n-config-provider>
</template>

<style scoped>

</style>