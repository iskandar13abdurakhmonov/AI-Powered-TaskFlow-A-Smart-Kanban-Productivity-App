import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Task } from "../types/Task.ts";
import { todosData } from '../data/todos.ts';
import { inProgressData } from "../data/inProgress.ts";
import { testingData } from "../data/testing.ts";
import { finishedData } from "../data/finished.ts";
import {
    STORAGE_KEYS,
    saveTasksToStorage,
    saveAllBoardsToStorage,
    loadAllBoardsFromStorage,
    clearAllBoardStorage,
    isLocalStorageAvailable
} from "../utils/localStorage.ts";

// Utility to map raw data to Task type, ensuring correct status and priority types
function mapToTaskArray(raw: any[], statusOverride?: Task["status"]): Task[] {
    return raw.map((item) => ({
        ...item,
        status: statusOverride ?? (item.status as Task["status"]),
        priority: item.priority as Task["priority"],
    }));
}

export const useTaskStore = defineStore('tasks', () => {
    const storageAvailable = isLocalStorageAvailable();

    const initialData = storageAvailable
        ? loadAllBoardsFromStorage({
            todos: mapToTaskArray(todosData, 'to-do'),
            inProgress: mapToTaskArray(inProgressData, 'in-progress'),
            testing: mapToTaskArray(testingData, 'testing'),
            finished: mapToTaskArray(finishedData, 'finished')
        })
        : {
            todos: mapToTaskArray(todosData, 'to-do'),
            inProgress: mapToTaskArray(inProgressData, 'in-progress'),
            testing: mapToTaskArray(testingData, 'testing'),
            finished: mapToTaskArray(finishedData, 'finished')
        };

    const todos = ref<Task[]>(initialData.todos);
    const inProgress = ref<Task[]>(initialData.inProgress);
    const testing = ref<Task[]>(initialData.testing);
    const finished = ref<Task[]>(initialData.finished);

    const loading = ref(false);

    if (storageAvailable) {
        watch(todos, (newTodos) => {
            saveTasksToStorage(STORAGE_KEYS.TODOS, newTodos);
        }, { deep: true });

        watch(inProgress, (newInProgress) => {
            saveTasksToStorage(STORAGE_KEYS.IN_PROGRESS, newInProgress);
        }, { deep: true });

        watch(testing, (newTesting) => {
            saveTasksToStorage(STORAGE_KEYS.TESTING, newTesting);
        }, { deep: true });

        watch(finished, (newFinished) => {
            saveTasksToStorage(STORAGE_KEYS.FINISHED, newFinished);
        }, { deep: true });
    }

    const getBoardByType = (type: string) => {
        switch (type) {
            case 'todos':
                return todos;
            case 'in-progress':
                return inProgress;
            case 'testing':
                return testing;
            case 'finished':
                return finished;
            default:
                return null;
        }
    };

    const getStatusByBoardType = (type: string): Task["status"] => {
        switch (type) {
            case 'todos':
                return 'to-do';
            case 'in-progress':
                return 'in-progress';
            case 'testing':
                return 'testing';
            case 'finished':
                return 'finished';
            default:
                return 'to-do';
        }
    };

    const change = (evt: any, currentBoardType: string) => {
        console.log('Drag event:', evt, currentBoardType);

        if (evt.added) {
            const addedTask = evt.added.element;
            const newStatus = getStatusByBoardType(currentBoardType);

            addedTask.status = newStatus;

            console.log(`Task "${addedTask.title}" added to ${currentBoardType} with status: ${newStatus}`);

            if (storageAvailable) {
                saveAllToStorage();
            }
        }
    };

    const addTask = (task: Task, boardType: string) => {
        const board = getBoardByType(boardType);
        if (board) {
            if (!task.id) {
                const allTasks = getAllTasks();
                task.id = allTasks.length > 0 ? Math.max(...allTasks.map(t => t.id)) + 1 : 1;
            }
            // Ensure status and priority are correct types
            task.status = getStatusByBoardType(boardType);
            task.priority = task.priority as Task["priority"];
            board.value.push(task);

            if (storageAvailable) {
                saveAllToStorage();
            }

            return true;
        } else {
            console.error(`Invalid board type: ${boardType}`);
            return false;
        }
    };

    const saveAllToStorage = () => {
        if (!storageAvailable) {
            console.warn('localStorage is not available');
            return;
        }

        saveAllBoardsToStorage({
            todos: todos.value,
            inProgress: inProgress.value,
            testing: testing.value,
            finished: finished.value
        });
    };

    const resetToDefault = () => {
        todos.value = mapToTaskArray(todosData, 'to-do');
        inProgress.value = mapToTaskArray(inProgressData, 'in-progress');
        testing.value = mapToTaskArray(testingData, 'testing');
        finished.value = mapToTaskArray(finishedData, 'finished');

        if (storageAvailable) {
            clearAllBoardStorage();
        }
    };

    const clearStorage = () => {
        if (!storageAvailable) {
            console.warn('localStorage is not available');
            return;
        }

        clearAllBoardStorage();
    };

    const exportData = () => {
        return {
            todos: todos.value,
            inProgress: inProgress.value,
            testing: testing.value,
            finished: finished.value,
            timestamp: new Date().toISOString()
        };
    };

    const importData = (data: any) => {
        try {
            if (data.todos) todos.value = data.todos;
            if (data.inProgress) inProgress.value = data.inProgress;
            if (data.testing) testing.value = data.testing;
            if (data.finished) finished.value = data.finished;
        } catch (error) {
            console.error('Error importing data:', error);
        }
    };

    const moveTask = (taskId: number, fromBoard: string, toBoard: string) => {
        const sourceBoard = getBoardByType(fromBoard);
        const targetBoard = getBoardByType(toBoard);

        if (!sourceBoard || !targetBoard) {
            console.error('Invalid board type');
            return;
        }

        const taskIndex = sourceBoard.value.findIndex(task => task.id === taskId);
        if (taskIndex === -1) {
            console.error('Task not found');
            return;
        }

        const task = sourceBoard.value.splice(taskIndex, 1)[0];
        task.status = getStatusByBoardType(toBoard);
        targetBoard.value.push(task);
    };

    const getAllTasks = () => {
        return [
            ...todos.value,
            ...inProgress.value,
            ...testing.value,
            ...finished.value
        ];
    };

    return {
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
        addTask,
        saveAllToStorage,
        resetToDefault,
        clearStorage,
        exportData,
        importData,
        storageAvailable,
    };
});