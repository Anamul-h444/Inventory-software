import React, { lazy } from "react";
const CategoryForm = lazy(() =>
  import("../../components/category/CategoryForm.jsx")
);
import MainLayout from "../../components/Layout/MainLayout";

const UpdateCategoryPage = () => {
  return (
    <MainLayout title="update category">
      <CategoryForm />
    </MainLayout>
  );
};

export default UpdateCategoryPage;
