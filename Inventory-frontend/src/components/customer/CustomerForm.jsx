import React, { useEffect, useState } from "react";
import Loader from "../../utility/Loader";
import { Formik, Form } from "formik";
import { customerValidation } from "../../validationSchema/CustomerValidation";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FormikControl from "../../control/FormikControl";
import {
  createCustomerService,
  getCustomerService,
} from "../../api/ApiCustomer";

const CustomerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isLoading = useSelector((state) => state.loader.value);
  const formValue = useSelector((state) => state.customer.FormValue);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (formValue) {
      setData({
        name: formValue.name,
        email: formValue.email,
        phone: formValue.phone,
        address: formValue.address,
      });
    }
  }, [formValue]);

  const [objectId, SetObjectID] = useState(id || 0); // Initialize objectId with id

  useEffect(() => {
    if (id) {
      SetObjectID(id);
      (async () => {
        const success = await getCustomerService(id);
        if (!success) {
          // Handle error fetching data
        }
      })();
    }
  }, [id, formValue]);

  const handleSubmit = async (values, onSubmitProps) => {
    const createSuccess = await createCustomerService(values, objectId); // Call the API function

    if (createSuccess === true) {
      setTimeout(() => {
        navigate("/customer/list");
        onSubmitProps.resetForm();
      }, 1000);
    }
  };

  if (isLoading) {
    return <Loader />; // Show the loader while fetching data
  }

  return (
    <div className="w-full mt-10 flex justify-center">
      <div className="w-[90%]  bg-white shadow-md rounded-md p-4 mt-8">
        <h1 className="font-bold text-gray-500 text-center mt-2">
          Customer Form
        </h1>

        <Formik
          initialValues={data}
          onSubmit={handleSubmit}
          validationSchema={customerValidation}
        >
          {(formik) => (
            <Form>
              <div>
                <div className="flex flex-col space-y-6">
                  <div className="grid grid-cols-3 gap-x-3 mt-8">
                    <FormikControl
                      control="plainInput"
                      type="text"
                      label="Customer Name"
                      name="name"
                      onChange={formik.handleChange}
                    />
                    <FormikControl
                      control="plainInput"
                      type="email"
                      label="Customer Email"
                      name="email"
                      onChange={formik.handleChange}
                    />
                    <FormikControl
                      control="plainInput"
                      type="text"
                      label="Mobile No"
                      name="phone"
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div>
                    <FormikControl
                      control="textarea"
                      label="Customer address"
                      name="address"
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="w-full flex justify-center mt-10 ">
                    <button
                      type="submit"
                      className="w-48 py-3 bg-rose-500 text-white mx-auto rounded-md hover:-translate-y-1 focus:translate-y-1 disabled:cursor-not-allowed"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CustomerForm;
