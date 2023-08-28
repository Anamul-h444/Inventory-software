import React, { lazy } from "react";
import MainLayout from "../../components/Layout/MainLayout";
const ProductForm = lazy(() => import("../../components/products/ProductForm"));

const UpdateProductPage = () => {
  return (
    <MainLayout title="Update product">
      <ProductForm />
    </MainLayout>
  );
};

export default UpdateProductPage;
