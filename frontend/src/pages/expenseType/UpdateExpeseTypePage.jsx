import React, { lazy } from "react";
const ExpenseTypeForm = lazy(() =>
    import("../../components/expenseType/ExpenseTypeForm.jsx")
);
import MainLayout from "../../components/Layout/MainLayout";

const UpdateExpenseTypePage = () => {
    return (
        <MainLayout title="Expense type list">
            <ExpenseTypeForm />
        </MainLayout>
    );
};

export default UpdateExpenseTypePage;