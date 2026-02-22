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

export interface BoardWithTasks extends Board {
  tasks: Task[];
}

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

export const STATUS_ORDER: TaskStatus[] = ["todo", "in_progress", "done"];
