import React, { lazy } from "react";
import MainLayout from "../../components/Layout/MainLayout";
const ProductForm = lazy(() => import("../../components/products/ProductForm"));

const CreateProductPage = () => {
  return (
    <MainLayout title="Create product">
      <ProductForm />
    </MainLayout>
  );
};

export default CreateProductPage;
