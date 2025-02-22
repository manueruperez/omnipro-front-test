// src/components/ProjectDetail.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { Project } from "#modules/projects/project.reducer.ts";
import TaskModalForm from "#molecules/taskModalForm/TaskModalForm.tsx";
import TaskCard from "#atoms/taskCard/TaskCard.tsx";
import { Task } from "#modules/tasks/tasks.reducer.ts";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const project = useSelector((state: any) =>
    state.projects.projects.find((p: Project) => p.id === Number(projectId))
  );
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);

  if (!project) return <div>No se encontró el proyecto.</div>;

  // Obtener las tareas asociadas al proyecto (suponiendo que cada proyecto tiene un array de taskIds)
  const tasks: Task[] = useSelector((state: any) => {
    return project.taskIds
      .map((taskId: number) => state.tasks.tasks[taskId])
      .filter((task: Task | undefined) => task !== undefined);
  });

  return (
    <div>
      <Button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
        Volver
      </Button>
      <h2>{project.name}</h2>
      <p>{project.description}</p>

      <Button type="primary" onClick={() => setIsTaskModalVisible(true)}>
        Agregar Tarea
      </Button>

      <TaskModalForm
        visible={isTaskModalVisible}
        onClose={() => setIsTaskModalVisible(false)}
        projectId={project.id}
      />

      <h3>Tareas</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          marginTop: "1rem",
        }}
      >
        {tasks.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;
