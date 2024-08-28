import { Route, Routes } from "react-router-dom";
import { RoutePaths } from "./RoutePaths";
import { Home } from "../home/Home";
import { TasksPage } from "../general/TasksPage";
import { ImagePage } from "../general/ImagePage";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path={RoutePaths.TASKS} element={<TasksPage />} />
      <Route path={RoutePaths.IMAGES} element={<ImagePage />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};
