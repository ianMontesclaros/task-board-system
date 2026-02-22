export type TaskStatus = "todo" | "in_progress" | "done";

export interface Task {
  id: string;
  boardId: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  assignedTo?: string | null;
  dueDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Board {
  id: string;
  name: string;
  description?: string | null;
  color?: string | null;
  createdAt: string;
  updatedAt: string;
  tasks?: Task[];
  _count?: { tasks: number };
}
