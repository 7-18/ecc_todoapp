import { Route, Routes, useLocation } from "react-router-dom";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { Amplify } from "aws-amplify";
import { _config } from "../services/amplifyConfig.js";
import { Loading } from "../components/Loading.jsx";
import { useSelector } from "react-redux";
import { PrivateRoutes } from "./PrivateRoutes.jsx";
import { PublicRoutes } from "./PublicRoutes.jsx";
import { useEffect } from "react";
import { useAuthStore } from "../hooks/useAuthStore.js";

Amplify.configure(_config);

export const AppRouter = () => {
  const { status } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const { checkAuthToken } = useAuthStore();

  console.log("status", status);

  useEffect(() => {
    checkAuthToken();
  }, [pathname]);

  if (status === "checking") {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loading name="loading" />
      </div>
    );
  }

  return (
    <>
      <Header status={status} pathname={pathname} />
      <Routes>
        {status === "authenticated" ? (
          <Route path="/*" element={<PrivateRoutes />} />
        ) : (
          <Route path="/*" element={<PublicRoutes />} />
        )}
      </Routes>
      <Footer />
    </>
  );
};
