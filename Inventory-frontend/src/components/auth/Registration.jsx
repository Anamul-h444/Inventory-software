import React, { useState } from "react";
import { Form, Formik } from "formik";
import FormikControl from "../../control/FormikControl";
import backgroundImage from "../../assets/images/bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { register } from "../../api/ApiAuth";
import { toast } from "react-hot-toast";
import Loader from "../../utility/Loader";

const Registration = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    fName: "",
    lName: "",
    email: "",
    mobile: "",
    password: "",
  };

  const validationSchema = Yup.object({
    fName: Yup.string().required("Required !"),
    lName: Yup.string().required("Required !"),
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

  const onSubmit = (values, onSubmitProps) => {
    setIsLoading(true);
    register(values)
      .then((response) => {
        toast.success("Registered!");
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
    onSubmitProps.resetForm();
  };
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-screen w-screen flex items-center justify-center animate-changeColor"
    >
      <section className="w-[400px] max-h-screen border  rounded-md text-white px-6 backdrop-blur-lg bg-transparent">
        <h2 className="flex items-center justify-center my-7 text-xl font-bold">
          Registration
        </h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form className="flex flex-col space-y-7">
              <FormikControl
                control="input"
                type="text"
                label="First Name"
                name="fName"
                error={formik.errors.name}
              />
              <FormikControl
                control="input"
                type="text"
                label="Last Name"
                name="lName"
                error={formik.errors.name}
              />
              <FormikControl
                control="input"
                type="email"
                label="Email"
                name="email"
                error={formik.errors.name}
              />
              <FormikControl
                control="input"
                type="text"
                label="Mobile No"
                name="mobile"
                error={formik.errors.name}
              />
              <FormikControl
                control="input"
                type="password"
                label="Password"
                name="password"
                error={formik.errors.name}
              />
              <div className="mt-5">
                <button
                  type="submit"
                  className="px-3 py-2 bg-white rounded-[40px] w-full text-black font-bold hover:shadow-lg hover:shadow-rose-500 transition duration-300 focus:translate-y-1 disabled:cursor-not-allowed "
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Registration
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="my-5 text-center">
          <p>
            Already Have and account ?{" "}
            <Link
              to="/"
              className="font-bold hover:border-b-2 ml-1 transition duration-300"
            >
              Login
            </Link>
          </p>
        </div>
      </section>
      {isLoading && <Loader />}
    </div>
  );
};

export default Registration;
