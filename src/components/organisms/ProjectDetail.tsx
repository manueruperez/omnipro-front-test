import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { Project } from "#modules/projects/project.reducer.ts";
import TaskModalForm from "#molecules/taskModalForm/TaskModalForm.tsx";
import TaskCard from "#atoms/taskCard/TaskCard.tsx";
import { AppState } from "#store/store.ts";
import { selectTasksForProject } from "#modules/projects/projet.selector.ts";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const projectIdNumber = Number(projectId);

  const project = useSelector((state: AppState) =>
    state.projects.projects.find((p: Project) => p.id === projectIdNumber)
  );
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);

  if (!project) return <div>No se encontró el proyecto.</div>;

  const projectTasksSelector = useMemo(
    () => selectTasksForProject(projectIdNumber),
    [projectIdNumber]
  );
  const tasks = useSelector((state: AppState) => projectTasksSelector(state));

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
      <div className="flex flex-col items-center gap-[16px]">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;
