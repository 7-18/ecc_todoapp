import { Route, Routes } from "react-router-dom";
import { ConfirmationCode } from "../components/ConfirmationCode";
import { LandingPage } from "../general/LandingPage";
import { RoutePaths } from "./RoutePaths";
import { LoginPage } from "../general/LoginPage";
import { RegisterPage } from "../general/RegisterPage";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path={RoutePaths.HOME} element={<LandingPage />} />
      <Route path={RoutePaths.LOGIN} element={<LoginPage />} />
      <Route path={RoutePaths.SIGNUP} element={<RegisterPage />} />
      <Route path={RoutePaths.CONFIRM_SIGNUP} element={<ConfirmationCode />} />
      <Route path="/*" element={<LandingPage />} />
    </Routes>
  );
};
