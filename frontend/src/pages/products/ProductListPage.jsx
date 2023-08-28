import React, { lazy } from "react";
import MainLayout from "../../components/Layout/MainLayout";
const ProductList = lazy(() => import("../../components/products/ProductList"));

const ProductListPage = () => {
  return (
    <MainLayout title="Products list">
      <ProductList />
    </MainLayout>
  );
};

export default ProductListPage;
