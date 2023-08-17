import React, { lazy } from "react";
const BrandForm = lazy(() => import("../../components/brand/BrandForm.jsx"));
import MainLayout from "../../components/Layout/MainLayout";

const UpdateBrandPage = () => {
  return (
    <MainLayout title="Update brand">
      <BrandForm />
    </MainLayout>
  );
};

export default UpdateBrandPage;
