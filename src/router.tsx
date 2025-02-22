import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Projects from "#modules/projects/Projects.tsx";
import Home from "#modules/home/Home.tsx";
import NotFound from "#modules/notFound/NotFound.tsx";
import AppLayout from "#templates/Layout.tsx";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/projects/*" element={<Projects />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
