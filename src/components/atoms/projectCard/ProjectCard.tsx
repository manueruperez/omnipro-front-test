import React from "react";
import { Card } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const { Meta } = Card;

interface ProjectCardProps {
  project: { name: string; description: string; id: number };
  onClick: () => void;
  onEditClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClick,
  onDeleteClick,
  onEditClick,
}) => {
  return (
    <Card
      hoverable
      style={{ width: 300, margin: "1rem", cursor: "pointer" }}
      actions={[
        <EditOutlined key="edit" onClick={() => onEditClick(project.id)} />,
        <DeleteOutlined
          key="delete"
          onClick={() => onDeleteClick(project.id)}
        />,
      ]}
    >
      <div onClick={onClick}>
        <Meta title={project.name} description={project.description} />
      </div>
    </Card>
  );
};

export default ProjectCard;
