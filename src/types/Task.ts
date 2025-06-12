export interface Task {
    id: string
    title: string
    description?: string
    status: 'to-do' | 'in-progress' | 'test' | 'finished'
    dueDate?: string
    priority?: 'low' | 'medium' | 'high'
    category?: string
    createdAt: string
    assignedTo: []
}