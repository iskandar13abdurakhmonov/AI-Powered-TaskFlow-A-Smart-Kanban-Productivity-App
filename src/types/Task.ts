export interface Task {
    id: number
    title: string
    description?: string
    status: 'to-do' | 'in-progress' | 'testing' | 'finished'
    dueDate?: string
    priority?: 'low' | 'medium' | 'high'
    progress: number
    category?: string
    createdAt: string
    assignedTo: []
}