import React, { lazy } from "react";
const CreateCustomer = lazy(() =>
  import("../../components/customer/CreateCustomer")
);
import MainLayout from "../../components/Layout/MainLayout";

const CustomerFormPage = () => {
  return (
    <MainLayout title="Create customer">
      <CreateCustomer />
    </MainLayout>
  );
};

export default CustomerFormPage;
