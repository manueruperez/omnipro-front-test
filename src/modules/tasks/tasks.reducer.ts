import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TaskStatus = "Pendiente" | "Completada";
export type TaskPriority = "Baja" | "Media" | "Alta";

export interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate?: string; // Puede ser string o Date, según tu preferencia
  status: TaskStatus;
  priority: TaskPriority;
}

interface TasksState {
  tasks: Record<number, Task>;
}

const initialState: TasksState = {
  tasks: {},
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action: PayloadAction<Task>) {
        const { id, ...task } = action.payload;
        state.tasks[id] = { id, ...task };
      },
      prepare(task: Omit<Task, "id">) {
        const id = Date.now();
        return { payload: { id, ...task } };
      },
    },
    updateTask(state, action: PayloadAction<Task>) {
      const { id } = action.payload;
      if (state.tasks[id]) {
        state.tasks[id] = action.payload;
      }
    },
    removeTask(state, action: PayloadAction<number>) {
      delete state.tasks[action.payload];
    },
  },
});

export const { addTask, updateTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
