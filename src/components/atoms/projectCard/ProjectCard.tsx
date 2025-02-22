// src/components/atoms/ProjectCard.tsx
import React from "react";
import { Card } from "antd";
import { Project } from "#modules/projects/project.reducer.ts";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <Card
      title={project.name}
      hoverable
      onClick={onClick}
      style={{ width: 300, margin: "1rem", cursor: "pointer" }}
    >
      <p>{project.description}</p>
    </Card>
  );
};

export default ProjectCard;
