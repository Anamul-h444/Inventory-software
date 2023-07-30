import React, { lazy } from "react";
const Profile = lazy(() => import("../components/auth/Profile"));
import MainLayout from "../components/Layout/MainLayout";

const ProfilePage = () => {
  return (
    <MainLayout title="Profile">
      <Profile />
    </MainLayout>
  );
};

export default ProfilePage;
