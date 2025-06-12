import type { Task } from "../types/Task.ts";

export const STORAGE_KEYS = {
    TODOS: 'kanban_todos',
    IN_PROGRESS: 'kanban_in_progress',
    TESTING: 'kanban_testing',
    FINISHED: 'kanban_finished'
} as const;

export const saveToStorage = <T>(key: string, data: T): void => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving to localStorage with key "${key}":`, error);
    }
};

export const loadFromStorage = <T>(key: string, fallbackData: T): T => {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallbackData;
    } catch (error) {
        console.error(`Error loading from localStorage with key "${key}":`, error);
        return fallbackData;
    }
};

export const saveTasksToStorage = (key: string, tasks: Task[]): void => {
    saveToStorage(key, tasks);
};

export const loadTasksFromStorage = (key: string, fallbackTasks: Task[]): Task[] => {
    return loadFromStorage<Task[]>(key, fallbackTasks);
};

export const saveAllBoardsToStorage = (boards: {
    todos: Task[];
    inProgress: Task[];
    testing: Task[];
    finished: Task[];
}): void => {
    saveTasksToStorage(STORAGE_KEYS.TODOS, boards.todos);
    saveTasksToStorage(STORAGE_KEYS.IN_PROGRESS, boards.inProgress);
    saveTasksToStorage(STORAGE_KEYS.TESTING, boards.testing);
    saveTasksToStorage(STORAGE_KEYS.FINISHED, boards.finished);
};

export const loadAllBoardsFromStorage = (defaultData: {
    todos: Task[];
    inProgress: Task[];
    testing: Task[];
    finished: Task[];
}) => {
    return {
        todos: loadTasksFromStorage(STORAGE_KEYS.TODOS, defaultData.todos),
        inProgress: loadTasksFromStorage(STORAGE_KEYS.IN_PROGRESS, defaultData.inProgress),
        testing: loadTasksFromStorage(STORAGE_KEYS.TESTING, defaultData.testing),
        finished: loadTasksFromStorage(STORAGE_KEYS.FINISHED, defaultData.finished)
    };
};

export const clearStorageKey = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error clearing localStorage key "${key}":`, error);
    }
};

export const clearAllBoardStorage = (): void => {
    Object.values(STORAGE_KEYS).forEach(key => {
        clearStorageKey(key);
    });
};

export const isLocalStorageAvailable = (): boolean => {
    try {
        const test = '__localStorage_test__';
        localStorage.setItem(test, 'test');
        localStorage.removeItem(test);
        return true;
    } catch {
        return false;
    }
};

export const getStorageInfo = () => {
    if (!isLocalStorageAvailable()) {
        return { available: false, usage: 0, total: 0 };
    }

    try {
        let totalSize = 0;
        for (const key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                totalSize += localStorage[key].length + key.length;
            }
        }

        return {
            available: true,
            usage: totalSize,
            total: 1024 * 1024 * 5, // Approximate 5MB limit for most browsers
            kanbanKeys: Object.values(STORAGE_KEYS).filter(key => localStorage.getItem(key) !== null)
        };
    } catch (error) {
        console.error('Error getting storage info:', error);
        return { available: true, usage: 0, total: 0, error: error };
    }
};