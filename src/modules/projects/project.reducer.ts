import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Project {
  id: number;
  name: string;
  description: string;
  taskIds: number[]; // Referencias a los IDs de las tareas asociadas
}

interface ProjectsState {
  projects: Project[];
}

const initialState: ProjectsState = {
  projects: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject(state, action: PayloadAction<Project>) {
      state.projects.push({ ...action.payload, taskIds: [] });
    },
    updateProject(state, action: PayloadAction<Project>) {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    removeProject(state, action: PayloadAction<number>) {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
    addTaskToProject(
      state,
      action: PayloadAction<{ projectId: number; taskId: number }>
    ) {
      const { projectId, taskId } = action.payload;
      const project = state.projects.find((p) => p.id === projectId);
      if (project) {
        project.taskIds.push(taskId);
      }
    },
    removeTaskFromProject(
      state,
      action: PayloadAction<{ projectId: number; taskId: number }>
    ) {
      const { projectId, taskId } = action.payload;
      const project = state.projects.find((p) => p.id === projectId);
      if (project) {
        project.taskIds = project.taskIds.filter((id) => id !== taskId);
      }
    },
  },
});

export const {
  addProject,
  updateProject,
  removeProject,
  addTaskToProject,
  removeTaskFromProject,
} = projectsSlice.actions;
export default projectsSlice.reducer;
