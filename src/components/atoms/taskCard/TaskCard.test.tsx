// src/components/atoms/taskCard/TaskCard.test.tsx
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import TaskCard from "./TaskCard";
import { Task } from "#modules/tasks/tasks.reducer.ts";

describe("TaskCard", () => {
  const task: Task = {
    id: 1,
    title: "Test Task",
    description: "Task description",
    dueDate: new Date("2025-12-02").toISOString(),
    priority: "Media",
    status: "Pendiente",
  };

  it("correct render of task data", () => {
    const { getByText, container } = render(
      <TaskCard task={task} onEditClick={() => {}} onDeleteClick={() => {}} />
    );

    // Verifica título, descripción y fecha de vencimiento
    expect(getByText("Test Task")).toBeInTheDocument();
    expect(getByText("Task description")).toBeInTheDocument();
    expect(getByText(/Vence:/)).toBeInTheDocument();

    // Verifica que exista el tag de prioridad
    const priorityTag = container.querySelector(".ant-tag");
    expect(priorityTag).toBeDefined();
    expect(priorityTag?.textContent).toMatch(/Media/);

    // Verifica que exista el tag de estado
    const stateTag = container.querySelectorAll(".ant-tag")[1];
    expect(stateTag).toBeDefined();
    expect(stateTag?.textContent).toMatch(/Pendiente/);
  });

  it("call onEditClick when click on content tasl", () => {
    const onEditMock = vi.fn();
    const { getByText } = render(
      <TaskCard task={task} onEditClick={onEditMock} onDeleteClick={() => {}} />
    );
    const descriptionElement = getByText("Task description");
    fireEvent.click(descriptionElement);
    expect(onEditMock).toHaveBeenCalledWith(task.id);
  });

  it("call  onEditClick when click in edit icon", () => {
    const onEditMock = vi.fn();
    const { container } = render(
      <TaskCard task={task} onEditClick={onEditMock} onDeleteClick={() => {}} />
    );

    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThanOrEqual(2);
    fireEvent.click(icons[0]);
    expect(onEditMock).toHaveBeenCalledWith(task.id);
  });

  it("call onDeleteClick when click on delete icon", () => {
    const onDeleteMock = vi.fn();
    const { container } = render(
      <TaskCard
        task={task}
        onEditClick={() => {}}
        onDeleteClick={onDeleteMock}
      />
    );

    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThanOrEqual(2);
    fireEvent.click(icons[1]);
    expect(onDeleteMock).toHaveBeenCalledWith(task.id);
  });
});
