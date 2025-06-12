<script setup lang="ts">
import { onMounted } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import { useTaskStore } from "../store/tasks.ts";

const {
	todos,
	inProgress,
	testing,
	finished,
	loading,
	change,
	moveTask,
	getAllTasks,
	getBoardByType,
	getStatusByBoardType,
	saveAllToStorage,
	resetToDefault,
	clearStorage,
	exportData,
	importData,
	storageAvailable,
} = useTaskStore();

function createDropdownOptions(options: Array<{ name: string, src: string }>) {
	return options.map(option => ({
		key: option.name,
		label: option.name
	}));
}

onMounted(() => {
	console.log('todos: ', todos.value);
});
</script>

<template>
	<div class="row flex justify-center">
		<div class="w-[500px]">
			<n-card class="col-3 card-custom">
				<n-h2 class="font-black" :strong="true">To-do</n-h2>
				<VueDraggableNext
						v-model="todos"
						:list="todos"
						:data-id="1"
						@change="change($event, 'todos')"
						group="tableColumns"
						style="min-height: 560px"
				>
					<n-list
							v-for="item in todos"
							:key="item.id"
							hoverable
							clickable
							bordered
							class="list-item-custom"
					>
						<n-list-item>
							<n-thing>
								<n-h4>
									{{ item.title }} {{ item.id }}
								</n-h4>
								<n-avatar-group :options="item.assignedTo" :size="30" :max="3">
									<template #avatar="{ option: { name, src } }">
										<n-tooltip>
											<template #trigger>
												<n-avatar :src="src" />
											</template>
											{{ name }}
										</n-tooltip>
									</template>
									<template #rest="{ options: restOptions, rest }">
										<n-dropdown :options="createDropdownOptions(restOptions)" placement="top">
											<n-avatar>+{{ rest }}</n-avatar>
										</n-dropdown>
									</template>
								</n-avatar-group>
							</n-thing>
						</n-list-item>
					</n-list>
				</VueDraggableNext>
			</n-card>
		</div>

		<div class="w-[500px]">
			<n-card class="col-3 card-custom">
				<n-h2>In-progress</n-h2>
				<VueDraggableNext
						v-model="inProgress"
						:list="inProgress"
						:data-id="2"
						@change="change($event, 'in-progress')"
						group="tableColumns"
						style="min-height: 560px"
				>
					<n-list
							v-for="item in inProgress"
							:key="item.id"
							hoverable
							clickable
							bordered
							class="list-item-custom"
					>
						<n-list-item>
							<n-thing>
								<n-h4>
									{{ item.title }} {{ item.id }}
								</n-h4>
								<n-avatar-group :options="item.assignedTo" :size="30" :max="3">
									<template #avatar="{ option: { name, src } }">
										<n-tooltip>
											<template #trigger>
												<n-avatar :src="src" />
											</template>
											{{ name }}
										</n-tooltip>
									</template>
									<template #rest="{ options: restOptions, rest }">
										<n-dropdown :options="createDropdownOptions(restOptions)" placement="top">
											<n-avatar>+{{ rest }}</n-avatar>
										</n-dropdown>
									</template>
								</n-avatar-group>
							</n-thing>
						</n-list-item>
					</n-list>
				</VueDraggableNext>
			</n-card>
		</div>

		<div class="w-[500px]">
			<n-card class="col-3 card-custom">
				<n-h2 class="font-black">Testing</n-h2>
				<VueDraggableNext
						v-model="testing"
						:list="testing"
						:data-id="3"
						@change="change($event, 'testing')"
						group="tableColumns"
						style="min-height: 560px"
				>
					<n-list
							v-for="item in testing"
							:key="item.id"
							hoverable
							clickable
							bordered
							class="list-item-custom"
					>
						<n-list-item>
							<n-thing>
								<n-h4>
									{{ item.title }} {{ item.id }}
								</n-h4>
								<n-avatar-group :options="item.assignedTo" :size="30" :max="3">
									<template #avatar="{ option: { name, src } }">
										<n-tooltip>
											<template #trigger>
												<n-avatar :src="src" />
											</template>
											{{ name }}
										</n-tooltip>
									</template>
									<template #rest="{ options: restOptions, rest }">
										<n-dropdown :options="createDropdownOptions(restOptions)" placement="top">
											<n-avatar>+{{ rest }}</n-avatar>
										</n-dropdown>
									</template>
								</n-avatar-group>
							</n-thing>
						</n-list-item>
					</n-list>
				</VueDraggableNext>
			</n-card>
		</div>

		<div class="w-[500px]">
			<n-card class="col-3 card-custom">
				<n-h2 class="font-black">Finished</n-h2>
				<VueDraggableNext
						v-model="finished"
						:list="finished"
						:data-id="4"
						@change="change($event, 'finished')"
						group="tableColumns"
						style="min-height: 560px"
				>
					<n-list
							v-for="item in finished"
							:key="item.id"
							hoverable
							clickable
							bordered
							class="list-item-custom"
					>
						<n-list-item>
							<n-thing>
								<n-h4>
									{{ item.title }} {{ item.id }}
								</n-h4>
								<n-avatar-group :options="item.assignedTo" :size="30" :max="3">
									<template #avatar="{ option: { name, src } }">
										<n-tooltip>
											<template #trigger>
												<n-avatar :src="src" />
											</template>
											{{ name }}
										</n-tooltip>
									</template>
									<template #rest="{ options: restOptions, rest }">
										<n-dropdown :options="createDropdownOptions(restOptions)" placement="top">
											<n-avatar>+{{ rest }}</n-avatar>
										</n-dropdown>
									</template>
								</n-avatar-group>
							</n-thing>
						</n-list-item>
					</n-list>
				</VueDraggableNext>
			</n-card>
		</div>
	</div>
</template>

<style scoped>
.card-custom {
	border-radius: 10px !important;
}

.card-custom :deep(.n-card) {
	border-radius: 10px !important;
}

.list-item-custom {
	margin-bottom: 1rem !important;
	border-radius: 10px !important;
}

.list-item-custom :deep(.n-list) {
	border-radius: 10px !important;
	overflow: hidden;
}

.list-item-custom :deep(.n-list-item) {
	border-radius: 10px !important;
}

.row {
	gap: 1rem;
	padding: 1rem;
}
</style>