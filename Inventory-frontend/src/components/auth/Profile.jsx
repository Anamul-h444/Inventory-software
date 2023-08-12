import React, { useEffect, useState } from "react";
import FormikControl from "../../control/FormikControl";
import { Form, Formik } from "formik";
import { userValidation } from "../../validationSchema/UserValidation";
import { getUserDetail } from "../../router/sessionHelper";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../utility/Loader";
import { setLoader } from "../../redux/slice-slate/loaderSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loader.value);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
  });

  useEffect(() => {
    dispatch(setLoader(true));
    const fetchUserDetail = async () => {
      try {
        const userData = await getUserDetail();
        if (userData) {
          setUser({
            firstName: userData.firstName || "",
            lastName: userData.lastName,
            email: userData.email,
            mobile: userData.mobile,
          });
          dispatch(setLoader(false));
        }
      } catch (error) {
        // Handle error, e.g., show an error message
        console.error("Error fetching user details:", error);
        dispatch(setLoader(false));
      }
    };

    fetchUserDetail();
  }, []);

  console.log(user);

  const handleSubmit = (values) => {
    console.log(values);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full mt-10 flex justify-center">
      <div className="w-[90%]  bg-white shadow-md rounded-md p-4 mt-8">
        <h1 className="font-bold text-gray-500 text-center mt-2">
          User Profile
        </h1>

        <Formik initialValues={user} onSubmit={handleSubmit}>
          {(formik) => (
            <Form>
              <div className="flex flex-col space-y-9">
                <div className="grid grid-cols-3 gap-5">
                  <FormikControl
                    control="plainInput"
                    type="text"
                    label="First Name"
                    name="firstName"
                    onChange={formik.handleChange}
                  />
                  <FormikControl
                    control="plainInput"
                    type="text"
                    label="Last Name"
                    name="lastName"
                    onChange={formik.handleChange}
                  />
                  <FormikControl
                    control="plainInput"
                    type="email"
                    label="Email"
                    name="email"
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <FormikControl
                    control="plainInput"
                    type="password"
                    label="Password"
                    name="password"
                    onChange={formik.handleChange}
                  />
                  <FormikControl
                    control="plainInput"
                    type="text"
                    label="Mobile"
                    name="mobile"
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="w-full flex justify-center mt-10 ">
                  <button
                    type="submit"
                    className="w-48 py-3 bg-rose-500 text-white mx-auto rounded-md hover:-translate-y-1 focus:translate-y-1 disabled:cursor-not-allowed"
                  >
                    Update
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Profile;
