import React, { lazy } from "react";
const ExpenseTypeList = lazy(() =>
    import("../../components/expenseType/ExpenseTypeList.jsx")
);
import MainLayout from "../../components/Layout/MainLayout";

const ExpenseTypeListPage = () => {
    return (
        <MainLayout title="Expense type list">
            <ExpenseTypeList />
        </MainLayout>
    );
};

export default ExpenseTypeListPage;