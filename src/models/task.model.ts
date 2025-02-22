// /types/task.ts
export interface TaskModel {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
}
