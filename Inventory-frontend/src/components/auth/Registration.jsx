import React, { useState } from "react";
import { Form, Formik } from "formik";
import FormikControl from "../../control/FormikControl";
import backgroundImage from "../../assets/images/bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/ApiAuth";
import { toast } from "react-hot-toast";
import Loader from "../../utility/Loader";
import { userValidation } from "../../validationSchema/UserValidation";

const Registration = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  };

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
          validationSchema={userValidation}
        >
          {(formik) => (
            <Form className="flex flex-col space-y-7">
              <FormikControl
                control="input"
                type="text"
                label="First Name"
                name="firstName"
                error={formik.errors.name}
              />
              <FormikControl
                control="input"
                type="text"
                label="Last Name"
                name="lastName"
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
