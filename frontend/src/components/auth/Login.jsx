import React, { useState } from "react";
import { Form, Formik } from "formik";
import FormikControl from "../../control/FormikControl";
import backgroundImage from "../../assets/images/bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/ApiAuth";
import { toast } from "react-hot-toast";
import Loader from "../../utility/Loader";
import { setToken, setUserDetail } from "../../router/sessionHelper";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    setIsLoading(true);
    login(values)
      .then((res) => {
        console.log(res.data.user);
        setToken(res.data.token);
        setUserDetail(res.data.user);
        toast.success("Login Successful !");
        setTimeout(() => {
          navigate("/layout");
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
        <h2 className="flex items-center justify-center my-10 text-xl font-bold">
          Login
        </h2>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {(formik) => (
            <Form className="flex flex-col space-y-8">
              <FormikControl
                control="input"
                type="email"
                label="Email"
                name="email"
              />

              <FormikControl
                control="input"
                type="password"
                label="Password"
                name="password"
              />
              <div className="flex justify-between mt-6">
                <div>
                  <label>
                    {" "}
                    <input type="checkbox" name="checkbox" className="mr-2" />
                    Remember me
                  </label>
                </div>
                <div>
                  <Link
                    to="#"
                    className="hover:border-b-2 transition all duration-500"
                  >
                    Forgot Password ?
                  </Link>
                </div>
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="px-3 py-2 bg-white rounded-[40px] w-full text-black font-bold hover:shadow-lg hover:shadow-rose-500 transition duration-300 focus:translate-y-1 disabled:cursor-not-allowed "
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="my-5 text-center">
          <p>
            Don't have and account ?{" "}
            <Link
              to="/register"
              className="font-bold hover:border-b-2 ml-1 transition duration-300"
            >
              Register
            </Link>
          </p>
        </div>
      </section>
      {isLoading && <Loader />}
    </div>
  );
};

export default Login;
