// src/components/ProjectList.tsx
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Tooltip, notification } from "antd";
import { Project, removeProject } from "#modules/projects/project.reducer.ts";
import ProjectModalForm from "#molecules/projectModalForm/ProjectModalForm.tsx";
import ProjectCard from "#atoms/projectCard/ProjectCard.tsx";
import ConfirmationModal from "#molecules/confirmationModal/ConfirmationModal.tsx";
import { PlusCircleOutlined } from "@ant-design/icons";

const ProjectList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector((state: any) => state.projects.projects);

  // Hook de notificaciones
  const [api, contextHolder] = notification.useNotification();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | undefined>(
    undefined
  );
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const showModal = () => {
    setProjectToEdit(undefined);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setProjectToEdit(undefined);
  };

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  const handleEditProject = (id: number) => {
    const project = projects.find((p: Project) => p.id === id);
    if (project) {
      setProjectToEdit(project);
      setIsModalVisible(true);
    }
  };

  const handleDeleteProject = (id: number) => {
    const project = projects.find((p: Project) => p.id === id);
    if (project) {
      setProjectToDelete(project);
      setIsConfirmVisible(true);
    }
  };

  const handleConfirmDelete = () => {
    if (projectToDelete) {
      dispatch(removeProject(projectToDelete.id));
      api.success({
        message: "Proyecto Eliminado",
        description: "El proyecto se eliminó correctamente.",
      });
    }
    setIsConfirmVisible(false);
    setProjectToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmVisible(false);
    setProjectToDelete(null);
  };

  return (
    <>
      {contextHolder}
      <div className="flex flex-col justify-between gap-2">
        <div className="flex flex-col justify-between items-center w-full">
          <Divider orientation="left">Tus Proyectos</Divider>
          <Button onClick={showModal} type="primary">
            Nuevo proyecto
          </Button>
        </div>
        <div className="flex flex-col items-center gap-4">
          {projects.length > 0 ? (
            projects.map((project: Project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleNavigation(`/projects/${project.id}`)}
                onEditClick={handleEditProject}
                onDeleteClick={handleDeleteProject}
              />
            ))
          ) : (
            <div className="flex flex-col w-full h-[400px] items-center justify-center">
              <h1 className="text-xl">No tienes proyectos aún</h1>
            </div>
          )}
          <ProjectModalForm
            visible={isModalVisible}
            onClose={closeModal}
            projectToEdit={projectToEdit}
          />
        </div>

        <ConfirmationModal
          visible={isConfirmVisible}
          message="¿Estás seguro de eliminar este proyecto?"
          onAccept={handleConfirmDelete}
          onReject={handleCancelDelete}
          onClose={handleCancelDelete}
        />
      </div>
    </>
  );
};

export default ProjectList;
