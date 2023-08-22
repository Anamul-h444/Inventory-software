import React, { lazy } from "react";
import MainLayout from "../../components/Layout/MainLayout";
const ExpenseList = lazy(() => import("../../components/expense/ExpenseList"));

const ExpenseListPage = () => {
  return (
    <MainLayout title="Expense list">
      <ExpenseList />
    </MainLayout>
  );
};

export default ExpenseListPage;
