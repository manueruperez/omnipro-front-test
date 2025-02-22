// src/components/ProjectDetail.tsx
import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { Project } from "#modules/projects/project.reducer.ts";
import TaskModalForm from "#molecules/taskModalForm/TaskModalForm.tsx";
import TaskCard from "#atoms/taskCard/TaskCard.tsx";
import ConfirmationModal from "#molecules/confirmationModal/ConfirmationModal.tsx";
import { AppState } from "#store/store.ts";
import { selectTasksForProject } from "#modules/projects/projet.selector.ts";
import { Task, removeTask } from "#modules/tasks/tasks.reducer.ts";
import { removeTaskFromProject } from "#modules/projects/project.reducer.ts";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projectIdNumber = Number(projectId);

  const project = useSelector((state: AppState) =>
    state.projects.projects.find((p: Project) => p.id === projectIdNumber)
  );
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);

  // Estados para el modal de confirmación de eliminación de tarea
  const [isTaskConfirmVisible, setIsTaskConfirmVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  if (!project) return <div>No se encontró el proyecto.</div>;

  const projectTasksSelector = useMemo(
    () => selectTasksForProject(projectIdNumber),
    [projectIdNumber]
  );
  const tasks = useSelector((state: AppState) => projectTasksSelector(state));

  const handleEditTask = (id: number) => {
    const task = tasks.find((t: Task) => t.id === id);
    if (task) {
      setTaskToEdit(task);
      setIsTaskModalVisible(true);
    }
  };

  // Al hacer clic en eliminar una tarea, se muestra el modal de confirmación
  const handleDeleteTask = (id: number) => {
    const task = tasks.find((t: Task) => t.id === id);
    if (task) {
      setTaskToDelete(task);
      setIsTaskConfirmVisible(true);
    }
  };

  // Si el usuario confirma la eliminación, despacha las acciones correspondientes
  const handleConfirmTaskDelete = () => {
    if (taskToDelete) {
      dispatch(removeTask(taskToDelete.id));
      dispatch(
        removeTaskFromProject({
          projectId: project.id,
          taskId: taskToDelete.id,
        })
      );
    }
    setIsTaskConfirmVisible(false);
    setTaskToDelete(null);
  };

  // Si se cancela, simplemente se cierra el modal
  const handleCancelTaskDelete = () => {
    setIsTaskConfirmVisible(false);
    setTaskToDelete(null);
  };

  return (
    <div>
      <Button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
        Volver
      </Button>
      <h2>{project.name}</h2>
      <p>{project.description}</p>

      <Button
        type="primary"
        onClick={() => {
          setTaskToEdit(undefined);
          setIsTaskModalVisible(true);
        }}
      >
        Agregar Tarea
      </Button>

      <TaskModalForm
        visible={isTaskModalVisible}
        onClose={() => {
          setIsTaskModalVisible(false);
          setTaskToEdit(undefined);
        }}
        projectId={project.id}
        taskToEdit={taskToEdit}
      />

      <h3>Tareas</h3>
      <div className="flex flex-col items-center gap-[16px]">
        {tasks.map((task: Task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEditClick={handleEditTask}
            onDeleteClick={handleDeleteTask}
          />
        ))}
      </div>

      <ConfirmationModal
        visible={isTaskConfirmVisible}
        message="¿Estás seguro de eliminar esta tarea?"
        onAccept={handleConfirmTaskDelete}
        onReject={handleCancelTaskDelete}
        onClose={handleCancelTaskDelete}
      />
    </div>
  );
};

export default ProjectDetail;
