import React, { lazy } from "react";
const SupplierForm = lazy(() =>
  import("../../components/supplier/SupplierForm")
);
import MainLayout from "../../components/Layout/MainLayout";

const UpdateSupplierPage = () => {
  return (
    <MainLayout title="Update supplier">
      <SupplierForm />
    </MainLayout>
  );
};

export default UpdateSupplierPage;
