import { Route, Routes } from "react-router-dom";
import { RoutePaths } from "./RoutePaths";
import { Home } from "../home/Home";

export const PrivateRoutes = () => {
  return (
    <Routes>
      {/* <Route path={RoutePaths.TASKS} element={<TasksPage />} />
      <Route path={RoutePaths.IMAGES} element={<ImagesPage />} /> */}
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};
