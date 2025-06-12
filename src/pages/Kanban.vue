<script setup lang="ts">
import { useTaskStore } from "../store/tasks.ts";
import DraggableColumn from "../components/DraggableColumn.vue";
import {onMounted} from "vue";

const {
	todos,
	inProgress,
	testing,
	finished,
	change,
} = useTaskStore();

function handleItemsUpdate(newItems: any, status: string) {
}

onMounted(() => {
	console.log(todos)
})
</script>

<template>
	<div class="row flex justify-center">
		<div class="w-[500px]">
			<DraggableColumn
					title="To-do"
					:items="todos"
					:data-id="1"
					status="todos"
					@update:items="(val) => handleItemsUpdate(val, 'todos')"
					@change="change"
			/>
		</div>

		<div class="w-[500px]">
			<DraggableColumn
					title="In-progress"
					:items="inProgress"
					:data-id="2"
					status="in-progress"
					@update:items="(val) => handleItemsUpdate(val, 'in-progress')"
					@change="change"
			/>
		</div>

		<div class="w-[500px]">
			<DraggableColumn
					title="Testing"
					:items="testing"
					:data-id="3"
					status="testing"
					@update:items="(val) => handleItemsUpdate(val, 'testing')"
					@change="change"
			/>
		</div>

		<div class="w-[500px]">
			<DraggableColumn
					title="Finished"
					:items="finished"
					:data-id="4"
					status="finished"
					@update:items="(val) => handleItemsUpdate(val, 'finished')"
					@change="change"
			/>
		</div>
	</div>
</template>

<style scoped>
.row {
	gap: 1rem;
	padding: 1rem;
}
</style>