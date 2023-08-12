import React, { lazy } from "react";
const CustomerForm = lazy(() =>
  import("../../components/customer/CustomerForm")
);
import MainLayout from "../../components/Layout/MainLayout";

const UpdateCustomerPage = () => {
  return (
    <MainLayout title="Update Form">
      <CustomerForm />
    </MainLayout>
  );
};

export default UpdateCustomerPage;
