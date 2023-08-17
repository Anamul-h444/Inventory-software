import React, { lazy } from "react";
const ExpenseTypeForm = lazy(() =>
    import("../../components/expenseType/ExpenseTypeForm.jsx")
);
import MainLayout from "../../components/Layout/MainLayout";

const CreateExpenseTypePage = () => {
    return (
        <MainLayout title="Create expense type">
            <ExpenseTypeForm />
        </MainLayout>
    );
};

export default CreateExpenseTypePage;