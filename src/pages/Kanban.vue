<script setup lang="ts">
import { useTaskStore } from "../store/tasks.ts";
import DraggableColumn from "../components/DraggableColumn.vue";
import {onMounted} from "vue";
import {useMessage} from "naive-ui";
import type { Task } from "../types/Task.ts";

const {
  todos,
  inProgress,
  testing,
  finished,
  change,
  getBoardByType,
} = useTaskStore();

const message = useMessage()

function handleItemsUpdate(newItems: any, status: string) {
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

onMounted(() => {
  console.log('Todos:', todos.value)
  console.log('InProgress:', inProgress.value)
  console.log('Testing:', testing.value)
  console.log('Finished:', finished.value)
})
</script>

<template>
  <n-flex justify="end">
  </n-flex>
  <div class="row flex justify-center">
    <div class="w-[500px]">
      <DraggableColumn
          title="To-do"
          :items="todos"
          :data-id="1"
          status="todos"
          @update:items="(val) => handleItemsUpdate(val, 'todos')"
          @change="change"
          @add-task="handleAddTask"
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
          @add-task="handleAddTask"
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
          @add-task="handleAddTask"
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
          @add-task="handleAddTask"
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