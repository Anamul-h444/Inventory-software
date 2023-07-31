import React from "react";
import { Formik, Form } from "formik";
import FormikControl from "../../control/FormikControl";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Required !"),
  phone: Yup.string()
    .required("Required !")
    .matches(/^(?:\+?88)?01[3-9]\d{8}$/, "Invalid Mobile number !"),
  email: Yup.string()
    .required("Required !")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email!"
    ),
  address: Yup.string().required("Required"),
});

const CustomerForm = ({ initialValues, onSubmit, buttonlabel, heading }) => {
  return (
    <div className="w-full mt-10 flex justify-center">
      <div className="w-[90%]  bg-white shadow-md rounded-md p-4 mt-8">
        <h1 className="font-bold text-gray-500 text-center mt-2">{heading}</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <Form>
                <div className="flex flex-col space-y-6">
                  <div className="grid grid-cols-3 gap-x-3 mt-8">
                    <FormikControl
                      control="plainInput"
                      type="text"
                      label="Customer Name"
                      name="name"
                    />
                    <FormikControl
                      control="plainInput"
                      type="email"
                      label="Customer Email"
                      name="email"
                    />
                    <FormikControl
                      control="plainInput"
                      type="text"
                      label="Customer Phone"
                      name="phone"
                    />
                  </div>
                  <div>
                    <FormikControl
                      control="textarea"
                      type="textarea"
                      label="Customer Address"
                      name="address"
                    />
                  </div>
                  <div className="w-full flex justify-center mt-10 ">
                    <button
                      type="submit"
                      className="w-48 py-3 bg-rose-500 text-white mx-auto rounded-md hover:-translate-y-1 focus:translate-y-1 disabled:cursor-not-allowed"
                      disabled={!formik.isValid || formik.isSubmitting}
                    >
                      {buttonlabel}
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default CustomerForm;
