import React, { lazy } from "react";
const CustomerForm = lazy(() =>
  import("../../components/customer/CustomerForm")
);
import MainLayout from "../../components/Layout/MainLayout";

const CustomerFormPage = () => {
  return (
    <MainLayout title="Customer Form">
      <CustomerForm />
    </MainLayout>
  );
};

export default CustomerFormPage;
