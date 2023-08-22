import React, { lazy } from "react";
import MainLayout from "../../components/Layout/MainLayout";
const ExpenseForm = lazy(() => import("../../components/expense/ExpenseForm"));

const CreateExpensePage = () => {
  return (
    <MainLayout title="Create expense">
      <ExpenseForm />
    </MainLayout>
  );
};

export default CreateExpensePage;
