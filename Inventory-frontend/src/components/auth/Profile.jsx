import React from "react";
import FormikControl from "../../control/FormikControl";
import { Form, Formik } from "formik";
import { userInfo } from "../../router/auth";

const Profile = () => {
  const user = userInfo();
  console.log(user);
  const initialValues = {};
  const onSubmit = () => {};
  return (
    <div className="flex justify-center mt-10 h-screen">
      <div className="w-[90%] h-[350px] bg-white shadow-md rounded-md">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {(formikProps) => {
            return (
              <Form className="p-4  mt-14 ">
                <div className="grid grid-cols-3 gap-x-3">
                  <div className="space-y-6">
                    <FormikControl
                      control="plainInput"
                      type="text"
                      label="First Name"
                      name="fName"
                    />
                    <FormikControl
                      control="plainInput"
                      type="text"
                      label="Last Name"
                      name="lName"
                    />
                  </div>
                  <div className="space-y-6">
                    <FormikControl
                      control="plainInput"
                      type="text"
                      label="Mobile"
                      name="mobile"
                    />
                    <FormikControl
                      control="plainInput"
                      type="password"
                      label="Password"
                      name="password"
                    />
                  </div>
                  <div className="space-y-6">
                    <FormikControl
                      control="plainInput"
                      type="email"
                      label="Email address"
                      name="email"
                      disabled
                    />
                    <FormikControl
                      control="file"
                      type="file"
                      label="Profile Picture"
                      name="file"
                      className="w-[40px]"
                    />
                  </div>
                </div>
                <div className="w-full flex justify-center mt-10 ">
                  <button className="w-48 py-3 bg-rose-500 text-white mx-auto rounded-md hover:-translate-y-1 focus:translate-y-1">
                    Update Profile
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Profile;
