// src/components/ProjectDetail.tsx
import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Divider, Tooltip } from "antd";
import { Project } from "#modules/projects/project.reducer.ts";
import TaskModalForm from "#molecules/taskModalForm/TaskModalForm.tsx";
import TaskCard from "#atoms/taskCard/TaskCard.tsx";
import ConfirmationModal from "#molecules/confirmationModal/ConfirmationModal.tsx";
import { AppState } from "#store/store.ts";
import { selectTasksForProject } from "#modules/projects/projet.selector.ts";
import { Task, removeTask } from "#modules/tasks/tasks.reducer.ts";
import { removeTaskFromProject } from "#modules/projects/project.reducer.ts";
import {
  ArrowLeftOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import TaskFilters from "#molecules/taskFilters/TaskFilter.tsx";
import ProjectModalForm from "#molecules/projectModalForm/ProjectModalForm.tsx";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projectIdNumber = Number(projectId);

  const project = useSelector((state: AppState) =>
    state.projects.projects.find((p: Project) => p.id === projectIdNumber)
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);

  const [isTaskConfirmVisible, setIsTaskConfirmVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [projectToEdit, setProjectToEdit] = useState<Project | undefined>(
    undefined
  );

  if (!project) return <div>No se encontró el proyecto.</div>;

  const projectTasksSelector = useMemo(
    () => selectTasksForProject(projectIdNumber),
    [projectIdNumber]
  );
  const tasks = useSelector((state: AppState) => projectTasksSelector(state));

  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    orderBy: "recent",
  });

  const handleFiltersChange = (newFilters: {
    status: string;
    priority: string;
    orderBy: string;
  }) => {
    setFilters(newFilters);
  };

  const filteredTasks = tasks
    .filter((task: Task) =>
      filters.status === "all" ? true : task.status === filters.status
    )
    .filter((task: Task) =>
      filters.priority === "all" ? true : task.priority === filters.priority
    )
    .sort((a: Task, b: Task) => {
      const timeA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
      const timeB = b.dueDate ? new Date(b.dueDate).getTime() : 0;

      if (filters.orderBy === "recent") {
        return timeB - timeA;
      } else if (filters.orderBy === "oldest") {
        return timeA - timeB;
      }
      return 0;
    });

  const closeModal = () => {
    setIsModalVisible(false);
    setProjectToEdit(undefined);
  };

  const handleEditProject = () => {
    const projectEdit = project;
    if (projectEdit) {
      setProjectToEdit(projectEdit);
      setIsModalVisible(true);
    }
  };

  const handleEditTask = (id: number) => {
    const task = tasks.find((t: Task) => t.id === id);
    if (task) {
      setTaskToEdit(task);
      setIsTaskModalVisible(true);
    }
  };

  const handleDeleteTask = (id: number) => {
    const task = tasks.find((t: Task) => t.id === id);
    if (task) {
      setTaskToDelete(task);
      setIsTaskConfirmVisible(true);
    }
  };

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

  const handleCancelTaskDelete = () => {
    setIsTaskConfirmVisible(false);
    setTaskToDelete(null);
  };

  return (
    <div className="projectDetailWrapper flex flex-col justify-between gap-10">
      <Divider orientation="left">Detalles de projecto</Divider>

      <div
        className="projectDataWrapper flex flex-row gap-5 items-center justify-between p-3"
        style={{
          background: "var(--primary-transparent)",
          borderRadius: "10px",
        }}
      >
        <Tooltip title="Regresar">
          <Button
            onClick={() => navigate(-1)}
            type="dashed"
            shape="circle"
            icon={<ArrowLeftOutlined />}
          />
        </Tooltip>
        <div className="flex flex-col items-start gap-2 w-full">
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </div>
        <Tooltip title="Editar projecto">
          <Button
            onClick={() => handleEditProject()}
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
          />
        </Tooltip>
        <Tooltip title="Crear">
          <Button
            onClick={() => {
              setTaskToEdit(undefined);
              setIsTaskModalVisible(true);
            }}
            type="primary"
            shape="circle"
            icon={<PlusCircleOutlined />}
          />
        </Tooltip>
        <ProjectModalForm
          visible={isModalVisible}
          onClose={closeModal}
          projectToEdit={projectToEdit}
        />
      </div>
      <Divider orientation="right">Filtros de tareas</Divider>

      <TaskFilters onFiltersChange={handleFiltersChange} />
      <Divider orientation="left">Listado de tareas</Divider>

      <TaskModalForm
        visible={isTaskModalVisible}
        onClose={() => {
          setIsTaskModalVisible(false);
          setTaskToEdit(undefined);
        }}
        projectId={project.id}
        taskToEdit={taskToEdit}
      />

      <div className="flex flex-col items-center gap-[16px]">
        {filteredTasks.map((task: Task) => (
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
