// /types/project.ts
import { TaskModel } from "./task.model";

export interface Project {
  id: string;
  name: string;
  tasks: TaskModel[];
}
