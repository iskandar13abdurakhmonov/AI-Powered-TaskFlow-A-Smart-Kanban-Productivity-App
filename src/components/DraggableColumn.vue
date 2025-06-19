<script setup lang="ts">
import { VueDraggableNext } from "vue-draggable-next";
import {Bug, Attach, ChatboxOutline, CalendarOutline, AlertOutline, AddCircleOutline, ImageOutline, CloseOutline} from '@vicons/ionicons5'
import {type FormInst, useMessage} from "naive-ui";
import type { UploadFileInfo } from 'naive-ui'
import {ref, nextTick, shallowRef, watch } from "vue";
import type { Task } from "../types/Task.ts";
import { useSpeechRecognition} from "@vueuse/core";

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array as () => Task[],
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

const emit = defineEmits(['update:items', 'change', 'add-task', 'update-task']);
const showForm = ref(false)
const formRef = ref<FormInst | null>(null)
const message = useMessage()
const formValue = ref({
  title: '',
  description: '',
  priority: 'medium',
  dueDate: new Date().toISOString().split('T')[0],
  category: 'General'
})
const showDetails = ref(false)
const selectedTask = ref<Task | null>(null)
const taskImages = ref<string[]>([])
const formImages = ref<string[]>([])


const rules = {
  title: {
    required: true,
    message: 'Please input task title',
    trigger: 'blur'
  }
}

const priorityOptions = [
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' }
]

const categoryOptions = [
  { label: 'General', value: 'General' },
  { label: 'Bug Fix', value: 'Bug Fix' },
  { label: 'Feature', value: 'Feature' },
  { label: 'Design', value: 'Design' },
  { label: 'Documentation', value: 'Documentation' }
]

async function handleValidateClick(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
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

const lang = shallowRef('en-US')

function sample<T>(arr: T[], size: number) {
	const shuffled = arr.slice(0)
	let i = arr.length
	let temp: T
	let index: number
	while (i--) {
		index = Math.floor((i + 1) * Math.random())
		temp = shuffled[index]
		shuffled[index] = shuffled[i]
		shuffled[i] = temp
	}
	return shuffled.slice(0, size)
}

const colors = ['aqua', 'azure', 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow', 'transparent']
const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(' | ')} ;`

const speech = useSpeechRecognition({
	lang,
	continuous: true,
})

const color = shallowRef('transparent')

if (speech.isSupported.value) {
	// @ts-ignore
	const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
	const speechRecognitionList = new SpeechGrammarList()
	speechRecognitionList.addFromString(grammar, 1)
	speech.recognition!.grammars = speechRecognitionList

	watch(speech.result, () => {
		for (const i of speech.result.value.toLowerCase().split(' ').reverse()) {
			if (colors.includes(i)) {
				color.value = i
				break
			}
		}
	})
}

const sampled = shallowRef<string[]>([])

function start() {
	color.value = 'transparent'
	speech.result.value = ''
	sampled.value = sample(colors, 5)
	speech.start()
}

const { isListening, isSupported, stop, result } = speech

const selectedLanguage = shallowRef(lang.value)
watch(lang, lang => isListening.value ? null : selectedLanguage.value = lang)
watch(isListening, isListening => isListening ? null : selectedLanguage.value = lang.value)

function addTask() {
	const dueDate = typeof formValue.value.dueDate === 'string'
			? formValue.value.dueDate
			: new Date(formValue.value.dueDate).toISOString().split('T')[0];

	const newTask: Task = {
		id: Math.floor(Math.random() * 100000),
		title: formValue.value.title,
		description: formValue.value.description,
		status: getStatusFromType(props.status),
		dueDate: dueDate,
		priority: formValue.value.priority as 'high' | 'medium' | 'low',
		progress: 0,
		category: formValue.value.category,
		createdAt: new Date().toISOString(),
		assignedTo: [],
		images: [...formImages.value]
	}

	console.log('new task: ', newTask)

	emit('add-task', newTask, props.status)
	resetForm()
}

function handleDateChange(value: string | null) {
	if (value) {
		formValue.value.dueDate = value
		console.log(formValue.value)
	}
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
	formValue.value = {
		title: '',
		description: '',
		priority: 'medium',
		dueDate: new Date().toISOString().split('T')[0],
		category: 'General'
	}
	formImages.value = []
	showForm.value = false
}

function cancelForm(event?: Event) {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  resetForm()
}

function openDetails(task: Task) {
  console.log('Opening task details:', task)
  selectedTask.value = task
  taskImages.value = task.images || []
  showDetails.value = true
}

function handleImageUpload(options: { file: UploadFileInfo, event?: Event }) {
  const file = options.file.file
  if (!file) return

  if (!file.type.startsWith('image/')) {
    message.error('Please select an image file')
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    message.error('Image size should be less than 5MB')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    const imageUrl = e.target?.result as string
    if (showForm.value) {
      formImages.value.push(imageUrl)
    } else if (selectedTask.value) {
      taskImages.value.push(imageUrl)
      const updatedTask = { ...selectedTask.value, images: [...taskImages.value] }
      emit('update-task', updatedTask)
    }
    message.success('Image uploaded successfully')
  }
  reader.readAsDataURL(file)
}

function removeImage(index: number, isForm: boolean = false, event?: Event) {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }

  if (isForm) {
    formImages.value.splice(index, 1)
  } else {
    taskImages.value.splice(index, 1)
    if (selectedTask.value) {
      const updatedTask = { ...selectedTask.value, images: [...taskImages.value] }
      emit('update-task', updatedTask)
    }
  }
  message.success('Image removed')
}



function getPriorityType(priority: string) {
  switch (priority) {
    case 'high': return 'error'
    case 'medium': return 'warning'
    case 'low': return 'success'
    default: return 'info'
  }
}

</script>

<template>
  <n-card class="col-3 card-custom">
    <NFlex justify="space-between">
      <n-h2 class="font-black" :strong="true">{{ title }} ({{ (items as Task[]).length }})</n-h2>
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
          v-for="item in (items as Task[])"
          :key="item.id"
          hoverable
          clickable
          bordered
          class="list-item-custom"
      >
        <n-list-item
            @click="openDetails(item as Task)"
        >
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

              <!-- Image gallery for task -->
              <div v-if="item.images && item.images.length > 0" style="margin-top: 20px" @click.stop>
                <n-image-group>
                  <div class="image-grid">
                    <n-image
                        v-for="(image, index) in item.images.slice(0, 3)"
                        :key="index"
                        :src="image"
                        width="340"
                        height="80"
                        object-fit="cover"
                        style="border-radius: 8px; margin-right: 8px; margin-bottom: 8px;"
                        @click.stop
                    />
                    <div v-if="item.images.length > 3" class="more-images-indicator">
                      <n-button size="small" quaternary @click.stop="openDetails(item as Task)">
                        +{{ item.images.length - 3 }} more
                      </n-button>
                    </div>
                  </div>
                </n-image-group>
              </div>

              <n-h2>{{ item.title }}</n-h2>
              <p v-if="item.description" class="text-gray-600 mb-4">{{ item.description }}</p>

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
                <n-tag
                    round
                    :bordered="false"
                    :type="getPriorityType(item.priority)"
                >
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
                      v-if="item.images && item.images.length > 0"
                      :value="item.images.length"
                      :max="99"
                      :offset="[-6, 6]"
                  >
                    <n-button
                        quaternary
                        circle
                        size="large"
                        @click.stop
                    >
                      <template #icon>
                        <n-icon
                            size="28"
                            :component="ImageOutline"
                            :depth="2"
                        />
                      </template>
                    </n-button>
                  </n-badge>
                  <n-badge
                      :value="1"
                      :max="99"
                      :offset="[-6, 6]"
                  >
                    <n-button
                        quaternary
                        circle
                        size="large"
                        @click.stop
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
                        @click.stop
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

	      <div>
		      <div v-if="!isSupported">
			      Your browser does not support SpeechRecognition API,
			      <a
					      href="https://caniuse.com/mdn-api_speechrecognition"
					      target="_blank"
			      >more details</a>
		      </div>
		      <div v-else>
			      <div space-x-4>
				      <label class="radio">
					      <input v-model="lang" value="en-US" type="radio">
					      <span>English (US)</span>
				      </label>
				      <label class="radio">
					      <input v-model="lang" value="fr" type="radio">
					      <span>French</span>
				      </label>
				      <label class="radio">
					      <input v-model="lang" value="es" type="radio">
					      <span>Spanish</span>
				      </label>
			      </div>
			      <n-button v-if="!isListening" @click="start">
				      Press and talk
			      </n-button>
			      <n-button v-if="isListening" class="orange" @click="stop">
				      Stop
			      </n-button>
			      <div v-if="isListening" class="mt-4">
				      <template v-if="selectedLanguage === 'en-US'">
					      <note class="mb-2">
						      <b>Please say a color</b>
					      </note>
					      <note class="mb-2">
						      try: {{ sampled.join(', ') }}
					      </note>
				      </template>

				      <p v-else-if="selectedLanguage === 'es'">
					      Speak some Spanish!
				      </p>

				      <p v-else-if="selectedLanguage === 'fr'">
					      Speak some French!
				      </p>

				      <p
						      class="tag"
						      :style="selectedLanguage === 'en-US' ? { background: color } : {}"
				      >
					      {{ result }}
				      </p>
			      </div>
		      </div>
	      </div>

        <n-form-item label="Title" path="title">
          <n-input
              v-model:value="formValue.title"
              placeholder="Enter task title"
              @keyup.enter="handleValidateClick"
          />
        </n-form-item>

        <n-form-item label="Description">
          <n-input
              v-model:value="formValue.description"
              type="textarea"
              placeholder="Enter task description"
              :rows="3"
          />
        </n-form-item>

        <n-form-item label="Priority">
          <n-select
              v-model:value="formValue.priority"
              :options="priorityOptions"
              placeholder="Select priority"
          />
        </n-form-item>

        <n-form-item label="Category">
          <n-select
              v-model:value="formValue.category"
              :options="categoryOptions"
              placeholder="Select category"
          />
        </n-form-item>

        <n-form-item label="Due Date">
          <n-date-picker
              v-model:value="formValue.dueDate"
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              @update:value="handleDateChange"
          />
        </n-form-item>

        <n-form-item label="Images">
          <div class="w-full">
            <n-upload
                :custom-request="handleImageUpload"
                accept="image/*"
                :show-file-list="false"
                multiple
            >
              <n-button dashed block>
                <template #icon>
                  <n-icon :component="ImageOutline" />
                </template>
                Click or drag images here
              </n-button>
            </n-upload>

            <div v-if="formImages.length > 0" class="mt-4">
              <n-space>
                <div
                    v-for="(image, index) in formImages"
                    :key="index"
                    class="relative inline-block"
                >
                  <n-image
                      :src="image"
                      width="100"
                      height="80"
                      object-fit="cover"
                      style="border-radius: 8px;"
                  />
                  <n-button
                      size="small"
                      circle
                      quaternary
                      type="error"
                      class="absolute -top-2 -right-2"
                      @click="removeImage(index, true, $event)"
                  >
                    <template #icon>
                      <n-icon :component="CloseOutline" />
                    </template>
                  </n-button>
                </div>
              </n-space>
            </div>
          </div>
        </n-form-item>

        <n-form-item>
          <n-space>
            <n-button type="primary" @click="handleValidateClick">
              Add Task
            </n-button>
            <n-button @click="cancelForm($event)">
              Cancel
            </n-button>
          </n-space>
        </n-form-item>
      </n-form>
    </n-card>
  </n-card>

  <n-modal
      v-model:show="showDetails"
  >
    <n-card
        style="width: 800px; max-height: 80vh; overflow-y: auto;"
        :title="`Task #${selectedTask?.id} - ${selectedTask?.title}`"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
        closable
        @close="showDetails = false"
    >
      <div v-if="selectedTask">
        <n-descriptions :column="2" bordered>
          <n-descriptions-item label="Status">
            <n-tag :type="selectedTask.status === 'finished' ? 'success' : 'info'">
              {{ selectedTask.status }}
            </n-tag>
          </n-descriptions-item>
          <n-descriptions-item label="Priority">
            <n-tag :type="getPriorityType(selectedTask.priority)">
              {{ selectedTask.priority }}
            </n-tag>
          </n-descriptions-item>
          <n-descriptions-item label="Category">
            {{ selectedTask.category }}
          </n-descriptions-item>
          <n-descriptions-item label="Due Date">
            {{ selectedTask.dueDate }}
          </n-descriptions-item>
          <n-descriptions-item label="Progress">
            <n-progress
                type="line"
                :percentage="selectedTask.progress"
                :status="getProgressStatus(selectedTask.progress)"
            />
          </n-descriptions-item>
          <n-descriptions-item label="Created">
            {{ new Date(selectedTask.createdAt).toLocaleDateString() }}
          </n-descriptions-item>
        </n-descriptions>

        <n-divider />

        <div v-if="selectedTask.description">
          <h3>Description</h3>
          <p>{{ selectedTask.description }}</p>
          <n-divider />
        </div>

        <div>
          <n-flex justify="space-between" align="center">
            <h3>Images ({{ taskImages.length }})</h3>
            <n-upload
                :custom-request="handleImageUpload"
                accept="image/*"
                :show-file-list="false"
            >
              <n-button size="small" type="primary">
                <template #icon>
                  <n-icon :component="ImageOutline" />
                </template>
                Add Image
              </n-button>
            </n-upload>
          </n-flex>

          <div v-if="taskImages.length > 0" style="margin-top: 16px;">
            <n-image-group>
              <n-grid :cols="4" :x-gap="12" :y-gap="12">
                <n-grid-item
                    v-for="(image, index) in taskImages"
                    :key="index"
                >
                  <div class="relative">
                    <n-image
                        :src="image"
                        width="150"
                        height="120"
                        object-fit="cover"
                        style="border-radius: 8px;"
                    />
                    <n-button
                        size="small"
                        circle
                        quaternary
                        type="error"
                        class="absolute top-2 right-2"
                        @click="removeImage(index, false, $event)"
                    >
                      <template #icon>
                        <n-icon :component="CloseOutline" />
                      </template>
                    </n-button>
                  </div>
                </n-grid-item>
              </n-grid>
            </n-image-group>
          </div>
          <n-empty v-else description="No images uploaded" style="margin-top: 20px;" />
        </div>
      </div>
    </n-card>
  </n-modal>


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

.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.more-images-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 80px;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  background-color: #fafafa;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.top-2 {
  top: 8px;
}

.right-2 {
  right: 8px;
}

.-top-2 {
  top: -8px;
}

.-right-2 {
  right: -8px;
}
</style>