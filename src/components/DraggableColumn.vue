<script setup lang="ts">
import { VueDraggableNext } from "vue-draggable-next";
import {Bug, Attach, ChatboxOutline, CalendarOutline, AlertOutline, AddCircleOutline} from '@vicons/ionicons5'

const props = defineProps({
	title: {
		type: String,
		required: true
	},
	items: {
		type: Array,
		required: true
	},
	dataId: {
		type: [String, Number],
		required: true
	},
	status: {
		type: String,
		required: true
	}
});

const emit = defineEmits(['update:items', 'change', 'openModal']);

function handleChange(event: any) {
	emit('update:items', event);
	emit('change', event, props.status);
}

function createDropdownOptions(options: Array<{ name: string, src: string }>) {
	return options.map(option => ({
		key: option.name,
		label: option.name
	}));
}

// Function to calculate progress status based on progress value
function getProgressStatus(progress: number) {
	if (progress < 20) return 'error'
	if (progress < 50) return 'warning'
	if (progress < 70) return 'info'
	if (progress < 100) return 'success'
	return 'success'
}
</script>

<template>
	<n-card class="col-3 card-custom">
		<NFlex justify="space-between">
			<n-h2 class="font-black" :strong="true">{{ title }}</n-h2>
			<NButton
					strong
					secondary
					round
					size="large"
					type="info"
					@click="$emit('openModal')"
			>
				<template #icon>
					<NIcon size="35" style="margin-right: 20px">
						<AddCircleOutline/>
					</NIcon>
				</template>
				<p class="font-semibold">Add Task</p>
			</NButton>
		</NFlex>
		<VueDraggableNext
				:list="items"
				:data-id="dataId"
				@change="handleChange"
				group="tableColumns"
				style="min-height: 560px"
		>
			<n-list
					v-for="item in items"
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
							<n-h2>{{ item.title }}</n-h2>
							<div>
								<n-progress
										type="line"
										:percentage="item.progress"
										indicator-placement="inside"
										processing
										:status="getProgressStatus(item.progress)"
								/>
							</div>
							<n-flex style="margin-top: 30px" justify="space-between">
								<n-tag type="info">
									{{ item.dueDate }}
									<template #icon>
										<n-icon :component="CalendarOutline" />
									</template>
								</n-tag>
								<n-tag round :bordered="false" type="success">
									{{ item.priority }}
									<template #icon>
										<n-icon :component="AlertOutline" />
									</template>
								</n-tag>
							</n-flex>
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
</style>