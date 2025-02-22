import React, { useState } from "react";
import { Modal, Input } from "antd";
import { useDispatch } from "react-redux";
import { Project, addProject } from "#modules/projects/project.reducer.ts";

interface ProjectModalFormProps {
  visible: boolean;
  onClose: () => void;
}

const ProjectModalForm: React.FC<ProjectModalFormProps> = ({
  visible,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");

  const handleOk = () => {
    if (!newProjectName.trim()) return; // Evita agregar si el nombre está vacío

    const newProject: Project = {
      id: Date.now(),
      name: newProjectName,
      description: newProjectDescription,
      taskIds: [],
    };

    dispatch(addProject(newProject));
    setNewProjectName("");
    setNewProjectDescription("");
    onClose();
  };

  return (
    <Modal
      title="Crear Nuevo Proyecto"
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Crear"
    >
      <div>
        <Input
          placeholder="Nombre del proyecto"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />
      </div>
      <div style={{ marginTop: 16 }}>
        <Input.TextArea
          placeholder="Descripción del proyecto"
          value={newProjectDescription}
          onChange={(e) => setNewProjectDescription(e.target.value)}
          rows={4}
        />
      </div>
    </Modal>
  );
};

export default ProjectModalForm;
