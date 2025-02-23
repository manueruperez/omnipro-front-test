// src/components/ProjectList.tsx
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "antd";
import { Project, removeProject } from "#modules/projects/project.reducer.ts";
import ProjectModalForm from "#molecules/projectModalForm/ProjectModalForm.tsx";
import ProjectCard from "#atoms/projectCard/ProjectCard.tsx";
import ConfirmationModal from "#molecules/confirmationModal/ConfirmationModal.tsx";
import { PlusCircleOutlined } from "@ant-design/icons";

const ProjectList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector((state: any) => state.projects.projects);
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
    }
    setIsConfirmVisible(false);
    setProjectToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmVisible(false);
    setProjectToDelete(null);
  };

  return (
    <div className="flex flex-col justify-between gap-2">
      <div className="flex flex-row justify-between items-center w-full">
        <h2>Lista de Proyectos</h2>
        <Tooltip title="Crear">
          <Button
            onClick={showModal}
            type="primary"
            shape="circle"
            icon={<PlusCircleOutlined />}
          />
        </Tooltip>
      </div>
      <div className="flex flex-col items-center">
        {projects.map((project: Project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => handleNavigation(`/projects/${project.id}`)}
            onEditClick={handleEditProject}
            onDeleteClick={handleDeleteProject}
          />
        ))}
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
  );
};

export default ProjectList;
