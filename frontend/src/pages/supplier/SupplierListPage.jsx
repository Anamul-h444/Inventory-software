import React, { lazy } from "react";
const SupplierList = lazy(() =>
  import("../../components/supplier/SupplierList")
);
import MainLayout from "../../components/Layout/MainLayout";

const SupplierListPage = () => {
  return (
    <MainLayout title="Supplier List">
      <SupplierList />
    </MainLayout>
  );
};

export default SupplierListPage;
