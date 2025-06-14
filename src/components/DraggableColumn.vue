<script setup lang="ts">
import { VueDraggableNext } from "vue-draggable-next";
import {Bug, Attach, ChatboxOutline, CalendarOutline, AlertOutline, AddCircleOutline} from '@vicons/ionicons5'
import {type FormInst, useMessage} from "naive-ui";
import {ref, nextTick} from "vue";
import type { Task } from "../types/Task.ts";

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

const emit = defineEmits(['update:items', 'change', 'add-task']);
const showForm = ref(false)
const formRef = ref<FormInst | null>(null)
const message = useMessage()
const formValue = ref({
  title: ''
})
const rules = {
  title: {
    required: true,
    message: 'Please input task title',
    trigger: 'blur'
  }
}

async function handleValidateClick(event: MouseEvent) {
  event.preventDefault()
  if (!formRef.value) {
    await nextTick()
  }

  if (!formRef.value) {
    message.error('Form not ready')
    return
  }

  formRef.value.validate((errors) => {
    if (!errors) {
      message.success('Task added successfully')
      addTask()
    }
    else {
      console.log(errors)
      message.error('Please fill in all required fields')
    }
  })
}

function addTask() {
  const newTask: Task = {
    id: Date.now(),
    title: formValue.value.title,
    description: '',
    status: getStatusFromType(props.status),
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'medium',
    progress: 0,
    category: 'General',
    createdAt: new Date().toISOString(),
    assignedTo: []
  }

  emit('add-task', newTask, props.status)
  resetForm()
}

function getStatusFromType(statusType: string): 'to-do' | 'in-progress' | 'testing' | 'finished' {
  switch (statusType) {
    case 'todos':
      return 'to-do'
    case 'in-progress':
      return 'in-progress'
    case 'testing':
      return 'testing'
    case 'finished':
      return 'finished'
    default:
      return 'to-do'
  }
}

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

function getProgressStatus(progress: number) {
  if (progress < 20) return 'error'
  if (progress < 50) return 'warning'
  if (progress < 70) return 'info'
  if (progress < 100) return 'success'
  return 'success'
}

async function addNewTask() {
  console.log('adding new task for: ', props.status)
  showForm.value = true
  await nextTick()
}

function resetForm() {
  formValue.value = { title: '' }
  showForm.value = false
}

function cancelForm() {
  resetForm()
}
</script>

<template>
  <n-card class="col-3 card-custom">
    <NFlex justify="space-between">
      <n-h2 class="font-black" :strong="true">{{ title }} ({{ items.length }})</n-h2>
      <NButton
          strong
          secondary
          round
          size="large"
          type="info"
          @click="addNewTask"
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

    <n-card v-if="showForm" style="margin-top: 1rem;" class="list-item-custom">
      <n-form
          ref="formRef"
          :label-width="80"
          :model="formValue"
          :rules="rules"
      >
        <n-form-item label="Title" path="title">
          <n-input
              v-model:value="formValue.title"
              placeholder="Enter task title"
              @keyup.enter="handleValidateClick"
          />
        </n-form-item>
        <n-form-item>
          <n-space>
            <n-button type="primary" @click="handleValidateClick">
              Add Task
            </n-button>
            <n-button @click="cancelForm">
              Cancel
            </n-button>
          </n-space>
        </n-form-item>
      </n-form>
    </n-card>
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