import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../router/PrivateRoute";
const Login = lazy(() => import("../components/auth/Login"));
const Registration = lazy(() => import("../components/auth/Registration"));
const MainLayout = lazy(() => import("../components/Layout/MainLayout"));
import ProfilePage from "../pages/ProfilePage";
import CustomerFormPage from "../pages/customer/CustomerFormPage";
import CustomerListPage from "../pages/customer/CustomerListPage";

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
      {/* Customer Route Start */}
      <Route
        path="/customer/form"
        element={
          <PrivateRoute>
            <CustomerFormPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/customer/list"
        element={
          <PrivateRoute>
            <CustomerListPage />
          </PrivateRoute>
        }
      />
      {/* Customer Route End */}
    </Routes>
  );
};

export default PagesRouter;
