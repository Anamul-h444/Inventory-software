import React, { lazy } from "react";
const CategoryForm = lazy(() =>
    import("../../components/category/CategoryForm.jsx")
);
import MainLayout from "../../components/Layout/MainLayout";

const CreateCategoryPage = () => {
    return (
        <MainLayout title="Create category">
            <CategoryForm />
        </MainLayout>
    );
};

export default CreateCategoryPage;