import React, { useEffect, useState } from "react";
import FormikControl from "../../control/FormikControl";
import { Form, Formik } from "formik";
import { update } from "../../api/ApiAuth";
import { toast } from "react-hot-toast";
import Loader from "../../utility/Loader";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userInfo } from "../../router/auth";

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required !"),
  lastName: Yup.string().required("Required !"),
  mobile: Yup.string()
    .required("Required !")
    .matches(/^(?:\+?88)?01[3-9]\d{8}$/, "Invalid Mobile number !"),
  email: Yup.string()
    .required("Required !")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email!"
    ),
  password: Yup.string()
    .required("Required !")
    .min(8, "Password must be at least 8 characters !")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = userInfo();
  const { firstName, lastName, mobile, email, password } = user;
  const initialValues = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    mobile: mobile,
    password: password,
  };

  const onSubmit = (values) => {
    setIsLoading(true);
    update(values)
      .then(() => {
        toast.success("Profule Update Success!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        let errMsg = "Something went wrong!";
        if (err.response) {
          errMsg = err.response.data;
        } else {
          errMsg = "Something went wrong!";
        }
        toast.error(errMsg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="flex justify-center mt-10 h-screen">
      <div className="w-[90%] h-[350px] bg-white shadow-md rounded-md">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formikProps) => {
            return (
              <Form className="p-4  mt-14 ">
                <div className="grid grid-cols-3 gap-x-3">
                  <div className="space-y-6">
                    <FormikControl
                      control="plainInput"
                      type="text"
                      label="First Name"
                      name="firstName"
                    />
                    <FormikControl
                      control="plainInput"
                      type="text"
                      label="Last Name"
                      name="lastName"
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
      {isLoading && <Loader />}
    </div>
  );
};

export default Profile;
