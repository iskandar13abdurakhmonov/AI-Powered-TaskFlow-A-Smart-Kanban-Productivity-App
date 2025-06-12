<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import { useTaskStore } from "../store/tasks.ts";
import { Bug, Attach, ChatboxOutline } from '@vicons/ionicons5'

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

const percentage = ref(33) // Your dynamic percentage

const progressStatus = computed(() => {
	if (percentage.value < 20) return 'error'
	if (percentage.value < 50) return 'warning'
	if (percentage.value < 70) return 'info'
	if (percentage.value < 100) return 'success'
	return 'success'
})

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
								<div>
									<div class="flex justify-between align-baseline">
										<n-tag
												type="info"
												size="large"
												:bordered="false"
										>
											<span class="font-bold text-base">#{{ item.id }}</span>
										</n-tag>
										<n-tag
												round
												type="warning"
												size="large"
												:bordered="false"
										>
											<span class="font-semibold">{{ item.category }}</span>
											<template #icon>
												<n-icon size="20" :component="Bug"/>
											</template>
										</n-tag>
									</div>
									<n-h4>
										{{ item.title }} {{ item.id }}
									</n-h4>
									<div>
										<n-progress
												type="line"
												:percentage="percentage"
												indicator-placement="inside"
												processing
												:status="progressStatus"
										/>
									</div>
									<div style="margin-top: 30px" class="flex justify-between align-baseline">
										<n-avatar-group :options="item.assignedTo" :size="35" :max="3">
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
										<div>
											<n-badge
													:value="1"
													:max="99"
													:offset="[-6, 6]"
											>
												<n-button
														quaternary
														circle
														size="large"
												>
													<template #icon>
														<n-icon
																size="28"
																:component="Attach"
																:depth="2"
														/>
													</template>
												</n-button>
											</n-badge>
											<n-badge
													:value="15"
													:max="999"
													:offset="[-6, 6]"
											>
												<n-button
														quaternary
														circle
														size="large"
												>
													<template #icon>
														<n-icon
																size="28"
																:depth="2"
																:component="ChatboxOutline"
														/>
													</template>
												</n-button>
											</n-badge>
										</div>
									</div>
								</div>
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