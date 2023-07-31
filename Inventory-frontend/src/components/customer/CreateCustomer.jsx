import React, { useState } from "react";
import CustomerForm from "./CustomerForm";
import Loader from "../../utility/Loader";
import { toast } from "react-hot-toast";
import { createCustomerService } from "../../api/ApiCustomer";
import { useNavigate } from "react-router-dom";

const CreateCustomer = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const initialValues = {
    name: "",
    address: "",
    phone: "",
    email: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    setLoading(true);
    createCustomerService(values)
      .then(() => {
        toast.success("Create Success !");
        setTimeout(() => {
          navigate("/customer/list");
        }, 1000);
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
      .finally(() => setLoading(false));
    onSubmitProps.resetForm();
  };

  return (
    <>
      <CustomerForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        buttonlabel="Create"
        heading="Create Customer"
      />
      {loading && <Loader />}
    </>
  );
};

export default CreateCustomer;
