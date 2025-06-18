export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'to-do' | 'in-progress' | 'testing' | 'finished';
    dueDate: string;
    priority: 'high' | 'medium' | 'low';
    progress: number;
    category: string;
    createdAt: string;
    assignedTo: Array<{ name: string; src: string }>;
    images?: string[]; // Array of base64 image URLs
}