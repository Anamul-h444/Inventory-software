import React, { lazy } from "react";
const CategoryList = lazy(() =>
  import("../../components/category/CategoryList")
);
import MainLayout from "../../components/Layout/MainLayout";

const CreateCategoryPage = () => {
  return (
    <MainLayout title="Category list">
      <CategoryList />
    </MainLayout>
  );
};

export default CreateCategoryPage;
