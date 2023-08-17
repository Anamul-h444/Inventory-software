import React, { useCallback, useEffect, useState } from "react";
import Loader from "../../utility/Loader";
import { isEmail, isEmpty, isMobile } from "../../utility/formHelper";
import { toast } from "react-hot-toast";
import Input from "../../utility/Input";
import {
  ResetFormValue,
  setFormValue,
} from "../../redux/slice-slate/supplierSlice";
import store from "../../redux/store";
import { useSelector } from "react-redux";
import {
  createUpdateSupplierRequest,
  getSupplierService,
} from "../../api/ApiSupplier";
import { useNavigate, useParams } from "react-router-dom";

const SupplierForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.loader.value);
  const supplierData = useSelector((state) => state.supplier.FormValue);
  const [objectId, SetObjectID] = useState(id || 0);


  useEffect(() => {
    if (id) {
      SetObjectID(id);
      (async () => {
        const success = await getSupplierService(id);
      })();
    } else {
      // Reset supplierData when transitioning from update to create
      store.dispatch(ResetFormValue());
    }
  }, [id]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    store.dispatch(setFormValue({ name, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(supplierData.name)) {
      toast.error("Supplier name required!");
    } else if (isEmail(supplierData.email)) {
      toast.error("Invalid email!");
    } else if (isMobile(supplierData.phone)) {
      toast.error("Invalid Mobile no!");
    } else if (isEmpty(supplierData.address)) {
      toast.error("Address required!");
    } else {
      const result = await createUpdateSupplierRequest(supplierData, objectId);
      if (result === true) {
        navigate("/supplier/list");
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full mt-10 flex justify-center">
      <div className="w-[90%]  bg-white shadow-md rounded-md p-5 mt-8">
        <h1 className="font-bold text-gray-500 text-center mt-2 mb-3">
          Supplier Form
        </h1>
        <form>
          <div className="flex flex-col space-y-7">
            <div className="grid grid-cols-2 gap-5">
              <Input
                type="text"
                name="name"
                onChange={handleChange}
                value={supplierData.name}
                label="Supplier Name"
              />
              <Input
                type="text"
                name="email"
                onChange={handleChange}
                value={supplierData.email}
                label="Supplier Email"
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <Input
                type="text"
                name="phone"
                onChange={handleChange}
                value={supplierData.phone}
                label="Phone No"
              />
              <Input
                type="text"
                name="address"
                onChange={handleChange}
                value={supplierData.address}
                label="Address"
              />
            </div>
            <div className="w-full flex justify-center mt-10 ">
              <button
                onClick={handleSubmit}
                className="w-48 py-4 bg-rose-500 text-white mx-auto rounded-md hover:-translate-y-1 focus:translate-y-1 disabled:cursor-not-allowed"
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
