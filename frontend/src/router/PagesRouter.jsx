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
import UpdateSupplierPage from "../pages/supplier/UpdateSupplierPage.jsx";

import CreateCategoryPage from "../pages/category/CreateCategoyPage.jsx";
import CategoryListPage from "../pages/category/CategoryListPage";
import UpdateCategoryPage from "../pages/category/UpdateCategoryPage";

import CreateExpenseTypePage from "../pages/expenseType/CreateExpenseTypePage.jsx";
import ExpenseTypeListPage from "../pages/expenseType/ExpenseTypeListPage.jsx";
import UpdateExpenseTypePage from "../pages/expenseType/UpdateExpeseTypePage.jsx";

import CreateBrandPage from "../pages/brand/CreateBrandPage.jsx";
import UpdateBrandPage from "../pages/brand/UpdateBrandPage";
import BrandListPage from "../pages/brand/BrandListPage";

import CreateExpensePage from "../pages/expense/CreateExpensePage";
import UpdateExpensepage from "../pages/expense/UpdateExpensepage";
import ExpenseListPage from "../pages/expense/ExpenseListPage";

import CreateProductPage from "../pages/products/CreateProductPage";
import UpdateProductPage from "../pages/products/UpdateProductPage";
import ProductListPage from "../pages/products/ProductListPage";

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

      {/* Expense Route Start */}
      <Route
        path="/expenseType/create"
        element={
          <PrivateRoute>
            <CreateExpenseTypePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/expenseType/list"
        element={
          <PrivateRoute>
            <ExpenseTypeListPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/expenseType/update/:id"
        element={
          <PrivateRoute>
            <UpdateExpenseTypePage />
          </PrivateRoute>
        }
      />
      {/*Expense route*/}
      {/* <Route
        path="/expense/create"
        element={
          <PrivateRoute>
            <CreateExpensePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/expense/list"
        element={
          <PrivateRoute>
            <ExpenseListPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/expense/update/:id"
        element={
          <PrivateRoute>
            <UpdateExpensepage />
          </PrivateRoute>
        }
      /> */}
      {/* Expense Route End */}

      {/* Brand Route Start */}
      <Route
        path="/brand/create"
        element={
          <PrivateRoute>
            <CreateBrandPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/brand/list"
        element={
          <PrivateRoute>
            <BrandListPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/brand/update/:id"
        element={
          <PrivateRoute>
            <UpdateBrandPage />
          </PrivateRoute>
        }
      />
      {/* Brand Route End */}

      {/* Category Route Start */}
      <Route
        path="/category/create"
        element={
          <PrivateRoute>
            <CreateCategoryPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/category/list"
        element={
          <PrivateRoute>
            <CategoryListPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/category/update/:id"
        element={
          <PrivateRoute>
            <UpdateCategoryPage />
          </PrivateRoute>
        }
      />
      {/* Category Route End */}

      {/* Expense route */}
      <Route
        path="/expense/*"
        element={
          <PrivateRoute>
            <Routes>
              <Route path="create" element={<CreateExpensePage />} />
              <Route path="list" element={<ExpenseListPage />} />
              <Route path="update/:id" element={<UpdateExpensepage />} />
            </Routes>
          </PrivateRoute>
        }
      />
      {/* Expense Route End */}

      {/* Product route */}
      <Route
        path="/product/*"
        element={
          <PrivateRoute>
            <Routes>
              <Route path="create" element={<CreateProductPage />} />
              <Route path="list" element={<ProductListPage />} />
              <Route path="update/:id" element={<UpdateProductPage />} />
            </Routes>
          </PrivateRoute>
        }
      />
      {/* Product Route End */}
    </Routes>
  );
};

export default PagesRouter;
