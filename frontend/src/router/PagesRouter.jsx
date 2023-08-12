import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../router/PrivateRoute";
const Login = lazy(() => import("../components/auth/Login"));
const Registration = lazy(() => import("../components/auth/Registration"));
const MainLayout = lazy(() => import("../components/Layout/MainLayout"));
import ProfilePage from "../pages/ProfilePage";

import CustomerFormPage from "../pages/customer/CustomerFormPage";
import UpdateCustomerPage from "../pages/customer/UpdateCustomerPage";
import CustomerListPage from "../pages/customer/CustomerListPage";

import CreateSupplierPage from "../pages/supplier/CreateSupplierPage";
import SupplierListPage from "../pages/supplier/SupplierListPage";
import UpdateSupplierPage from "../pages/supplier/UpdateSupplierPage";

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
        path="/customer/create"
        element={
          <PrivateRoute>
            <CustomerFormPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/customer/update/:id"
        element={
          <PrivateRoute>
            <UpdateCustomerPage />
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
      {/* Supplier Route Start */}
      <Route
        path="/supplier/create"
        element={
          <PrivateRoute>
            <CreateSupplierPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/supplier/list"
        element={
          <PrivateRoute>
            <SupplierListPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/supplier/update/:id"
        element={
          <PrivateRoute>
            <UpdateSupplierPage />
          </PrivateRoute>
        }
      />
      {/* Supplier Route End */}
    </Routes>
  );
};

export default PagesRouter;
