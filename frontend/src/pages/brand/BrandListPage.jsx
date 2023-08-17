import React, { lazy } from "react";
const BrandList = lazy(() => import("../../components/brand/BrandList"));
import MainLayout from "../../components/Layout/MainLayout";

const BrandListPage = () => {
  return (
    <MainLayout title="Brand list">
      <BrandList />
    </MainLayout>
  );
};

export default BrandListPage;
