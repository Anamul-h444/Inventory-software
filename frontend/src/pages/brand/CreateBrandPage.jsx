import React, { lazy } from "react";
const BrandForm = lazy(() =>
    import("../../components/brand/BrandForm.jsx")
);
import MainLayout from "../../components/Layout/MainLayout";

const CreateBrandPage = () => {
    return (
        <MainLayout title="Create brand">
            <BrandForm />
        </MainLayout>
    );
};

export default CreateBrandPage;