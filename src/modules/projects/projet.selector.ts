import { AppState } from "#store/store.ts";
import { createSelector } from "@reduxjs/toolkit";
import { Project } from "./project.reducer";

export const selectProjectById = (projectId: number) => (state: AppState) =>
  state.projects.projects.find((project: Project) => project.id === projectId);

export const selectTasksForProject = (projectId: number) =>
  createSelector(
    [
      (state: AppState) => state.projects.projects,
      (state: AppState) => state.tasks.tasks,
    ],
    (projects, tasks) => {
      const project = projects.find((p: Project) => p.id === projectId);
      if (!project) return [];
      return project.taskIds
        .map((taskId) => tasks[taskId])
        .filter((task) => task !== undefined);
    }
  );
