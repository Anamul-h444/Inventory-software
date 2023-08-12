import React, { lazy } from "react";
const CustomerList = lazy(() =>
  import("../../components/customer/CustomerList")
);
import MainLayout from "../../components/Layout/MainLayout";

const CustomerListPage = () => {
  return (
    <MainLayout title="Customer list">{<CustomerList /> }</MainLayout>
  );
};

export default CustomerListPage;
