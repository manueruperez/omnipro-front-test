// components/ProjectList.tsx
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { Project } from "#modules/projects/project.reducer.ts";
import ProjectModalForm from "#molecules/projectModalForm/ProjectModalForm.tsx";
import ProjectCard from "#atoms/projectCard/ProjectCard.tsx";

const ProjectList = () => {
  const navigate = useNavigate();
  const projects = useSelector((state: any) => state.projects.projects);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <div>
      <h2>Lista de Proyectos</h2>

      <Button type="primary" onClick={showModal}>
        Crear Nuevo Proyecto
      </Button>
      <div className="flex flex-col items-center">
        {projects.map((project: Project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => handleNavigation(`/projects/${project.id}`)}
          />
        ))}

        <ProjectModalForm visible={isModalVisible} onClose={closeModal} />
      </div>
    </div>
  );
};

export default ProjectList;
