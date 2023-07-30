import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../router/PrivateRoute";
const Login = lazy(() => import("../components/auth/Login"));
const Registration = lazy(() => import("../components/auth/Registration"));
const MainLayout = lazy(() => import("../components/Layout/MainLayout"));
import ProfilePage from "../pages/ProfilePage";

const PagesRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      {/* <Route path="/layout" element={<MainLayout />} /> */}

      <Route
        path="/layout"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default PagesRouter;
