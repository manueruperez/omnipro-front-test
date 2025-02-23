// src/molecules/projectModalForm/ProjectModalForm.tsx
import React, { useState, useEffect } from "react";
import { Modal, Input, notification } from "antd";
import { useDispatch } from "react-redux";
import {
  Project,
  addProject,
  updateProject,
} from "#modules/projects/project.reducer.ts";

interface ProjectModalFormProps {
  visible: boolean;
  onClose: () => void;
  projectToEdit?: Project;
}

const ProjectModalForm: React.FC<ProjectModalFormProps> = ({
  visible,
  onClose,
  projectToEdit,
}) => {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  // Hook para notificaciones
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (projectToEdit) {
      setProjectName(projectToEdit.name);
      setProjectDescription(projectToEdit.description);
    } else {
      setProjectName("");
      setProjectDescription("");
    }
  }, [projectToEdit]);

  const handleOk = () => {
    if (!projectName.trim()) return;

    if (projectToEdit) {
      // Modo edición: actualiza el proyecto existente
      const updatedProject: Project = {
        ...projectToEdit,
        name: projectName,
        description: projectDescription,
      };
      dispatch(updateProject(updatedProject));
      api.success({
        message: "Proyecto Actualizado",
        description: "El proyecto se actualizó correctamente.",
      });
    } else {
      // Modo creación: agrega un nuevo proyecto
      const newProject: Project = {
        id: Date.now(),
        name: projectName,
        description: projectDescription,
        taskIds: [],
      };
      dispatch(addProject(newProject));
      api.success({
        message: "Proyecto Creado",
        description: "El proyecto se creó correctamente.",
      });
    }
    onClose();
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={projectToEdit ? "Editar Proyecto" : "Crear Nuevo Proyecto"}
        visible={visible}
        onOk={handleOk}
        onCancel={onClose}
        okText={projectToEdit ? "Actualizar" : "Crear"}
      >
        <div>
          <Input
            placeholder="Nombre del proyecto"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <div style={{ marginTop: 16 }}>
          <Input.TextArea
            placeholder="Descripción del proyecto"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            rows={4}
          />
        </div>
      </Modal>
    </>
  );
};

export default ProjectModalForm;
