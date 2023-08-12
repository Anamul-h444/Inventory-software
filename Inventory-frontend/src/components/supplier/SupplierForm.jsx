import React, { useEffect, useState } from "react";
import Loader from "../../utility/Loader";
import { isEmail, isEmpty, isMobile } from "../../utility/formHelper";
import { toast } from "react-hot-toast";
import Input from "../../utility/Input";
import { setFormValue } from "../../redux/slice-slate/supplierSlice";
import store from "../../redux/store";
import { useSelector } from "react-redux";

const SupplierForm = () => {
  const isLoading = useSelector((state) => state.loader.value);
  const [supplier, setSupplier] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const { name, email, phone, address } = supplier;

  const supplierData = useSelector((state) => state.supplier.FormValue);

  useEffect(() => {
    if (supplierData) {
      setSupplier({
        name: supplierData.name || "",
        email: supplierData.email || "",
        phone: supplierData.phone || "",
        address: supplierData.address || "",
      });
    }
  }, [supplierData]);

  const handleChange = (e) => {
    store.dispatch(setFormValue({ [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    console.log(supplier);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full mt-10 flex justify-center">
      <div className="w-[90%]  bg-white shadow-md rounded-md p-4 mt-8">
        <h1 className="font-bold text-gray-500 text-center mt-2">
          Supplier Form
        </h1>
        <form>
          <div className="flex flex-col space-y-7">
            <div className="grid grid-cols-2 gap-5">
              <Input
                type="text"
                name="name"
                onChange={handleChange}
                value={name}
                label="Supplier Name"
              />
              <Input
                type="text"
                name="email"
                onChange={handleChange}
                value={email}
                label="Supplier Email"
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <Input
                type="text"
                name="phone"
                onChange={handleChange}
                value={phone}
                label="Phone No"
              />
              <Input
                type="text"
                name="address"
                onChange={handleChange}
                value={address}
                label="Address"
              />
            </div>
            <div className="w-full flex justify-center mt-10 ">
              <button
                onClick={handleSubmit}
                className="w-48 py-3 bg-rose-500 text-white mx-auto rounded-md hover:-translate-y-1 focus:translate-y-1 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierForm;
