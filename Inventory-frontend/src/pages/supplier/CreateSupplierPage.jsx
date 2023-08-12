import React, { lazy } from "react";
const SupplierForm = lazy(() =>
  import("../../components/supplier/SupplierForm")
);
import MainLayout from "../../components/Layout/MainLayout";

const CreateSupplierPage = () => {
  return (
    <MainLayout title="Create supplier">
      <SupplierForm />
    </MainLayout>
  );
};

export default CreateSupplierPage;
