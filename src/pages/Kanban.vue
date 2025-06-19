<script setup lang="ts">
import { useTaskStore } from "../store/tasks.ts";
import DraggableColumn from "../components/DraggableColumn.vue";
import {onMounted, ref, computed} from "vue";
import type { Task } from "../types/Task.ts";

const {
	todos,
	inProgress,
	testing,
	finished,
	change,
	getBoardByType,
} = useTaskStore();

const isMobile = ref(false)
const isTablet = ref(false)

const checkScreenSize = () => {
	isMobile.value = window.innerWidth < 768
	isTablet.value = window.innerWidth >= 768 && window.innerWidth < 1024
}

const containerClasses = computed(() => {
	if (isMobile.value) {
		return 'mobile-layout'
	} else if (isTablet.value) {
		return 'tablet-layout'
	} else {
		return 'desktop-layout'
	}
})

function handleItemsUpdate() {
}

function handleAddTask(newTask: Task, boardType: string) {
	const board = getBoardByType(boardType);
	if (board) {
		board.value.push(newTask);
		console.log(`New task "${newTask.title}" added to ${boardType}`);
	} else {
		console.error(`Board type "${boardType}" not found`);
	}
}

function handleUpdateTask(updatedTask: Task) {
	const boards = ['todos', 'in-progress', 'testing', 'finished'];

	for (const boardType of boards) {
		const board = getBoardByType(boardType);
		if (board) {
			const taskIndex = board.value.findIndex(task => task.id === updatedTask.id);
			if (taskIndex !== -1) {
				board.value[taskIndex] = updatedTask;
				console.log(`Task "${updatedTask.title}" updated in ${boardType}`);
				break;
			}
		}
	}
}

onMounted(() => {
	console.log('Todos:', todos.value)
	console.log('InProgress:', inProgress.value)
	console.log('Testing:', testing.value)
	console.log('Finished:', finished.value)

	checkScreenSize()

	window.addEventListener('resize', checkScreenSize)
})
</script>

<template>
	<n-flex justify="end">
	</n-flex>

	<div class="kanban-container" :class="containerClasses">
		<div class="column-wrapper">
			<DraggableColumn
					title="To-do"
					:items="todos"
					:data-id="1"
					status="todos"
					@update:items="(val) => handleItemsUpdate(val, 'todos')"
					@change="change"
					@add-task="handleAddTask"
					@update-task="handleUpdateTask"
			/>
		</div>

		<div class="column-wrapper">
			<DraggableColumn
					title="In-progress"
					:items="inProgress"
					:data-id="2"
					status="in-progress"
					@update:items="(val) => handleItemsUpdate(val, 'in-progress')"
					@change="change"
					@add-task="handleAddTask"
					@update-task="handleUpdateTask"
			/>
		</div>

		<div class="column-wrapper">
			<DraggableColumn
					title="Testing"
					:items="testing"
					:data-id="3"
					status="testing"
					@update:items="(val) => handleItemsUpdate(val, 'testing')"
					@change="change"
					@add-task="handleAddTask"
					@update-task="handleUpdateTask"
			/>
		</div>

		<div class="column-wrapper">
			<DraggableColumn
					title="Finished"
					:items="finished"
					:data-id="4"
					status="finished"
					@update:items="(val) => handleItemsUpdate(val, 'finished')"
					@change="change"
					@add-task="handleAddTask"
					@update-task="handleUpdateTask"
			/>
		</div>
	</div>
</template>

<style scoped>
.kanban-container {
	padding: 1rem;
	width: 100%;
}

.mobile-layout {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.mobile-layout .column-wrapper {
	width: 100%;
	min-width: auto;
}

.tablet-layout {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
	align-items: start;
}

.tablet-layout .column-wrapper {
	width: 100%;
	min-width: 350px;
}

.desktop-layout {
	display: flex;
	justify-content: center;
	gap: 1rem;
	flex-wrap: wrap;
}

.desktop-layout .column-wrapper {
	flex: 1;
	min-width: 350px;
	max-width: 500px;
}

@media (min-width: 1440px) {
	.desktop-layout {
		flex-wrap: nowrap;
	}

	.desktop-layout .column-wrapper {
		width: 500px;
		flex: none;
	}
}

@media (max-width: 480px) {
	.kanban-container {
		padding: 0.5rem;
	}

	.mobile-layout {
		gap: 0.75rem;
	}
}

@media (min-width: 768px) and (max-width: 1023px) and (orientation: portrait) {
	.tablet-layout {
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	.tablet-layout .column-wrapper {
		max-width: 600px;
		margin: 0 auto;
	}
}

@media (max-width: 767px) {
	.kanban-container {
		overflow-x: visible;
	}
}

@media (min-width: 1024px) and (max-width: 1439px) {
	.desktop-layout {
		justify-content: flex-start;
	}

	.desktop-layout .column-wrapper {
		flex: 1 1 calc(50% - 0.5rem);
		max-width: calc(50% - 0.5rem);
	}
}
</style>