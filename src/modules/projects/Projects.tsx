// Projects.tsx
import ProjectDetail from "#organisms/ProjectDetail.tsx";
import ProjectList from "#organisms/ProjectList.tsx";
import { Routes, Route } from "react-router-dom";

const Projects = () => {
  return (
    <Routes>
      <Route path="/" element={<ProjectList />} />
      <Route path=":projectId" element={<ProjectDetail />} />
    </Routes>
  );
};

export default Projects;
