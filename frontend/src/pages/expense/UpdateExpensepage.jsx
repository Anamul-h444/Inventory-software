import React, { lazy } from "react";
import MainLayout from "../../components/Layout/MainLayout";
const ExpenseForm = lazy(() => import("../../components/expense/ExpenseForm"));

const UpdateExpensePage = () => {
  return (
    <MainLayout title="Update expense">
      <ExpenseForm />
    </MainLayout>
  );
};

export default UpdateExpensePage;
