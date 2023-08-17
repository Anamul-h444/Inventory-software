import React, { useEffect, useState } from "react";
import Input from "../../utility/Input.jsx";
import { useSelector } from "react-redux";
import { setFormValue } from "../../redux/slice-slate/brandSlice.js";
import store from "../../redux/store.js";
import { isEmpty } from "../../utility/formHelper.jsx";
import { toast } from "react-hot-toast";
import {
  createUpdateBrandRequest,
  getBrandService,
} from "../../api/ApiBrand.jsx";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../utility/Loader.jsx";
import { ResetFormValue } from "../../redux/slice-slate/brandSlice.js";

const BrandForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isLoading = useSelector((state) => state.loader.values);
  const brand = useSelector((state) => state.brand.FormValue);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    store.dispatch(setFormValue({ name, value }));
  };

  const [objectId, setObjectId] = useState(0);

  useEffect(() => {
    if (id) {
      setObjectId(id);
      (async () => await getBrandService(id))();
    } else {
      // Reset brandData when transitioning from update to create
      store.dispatch(ResetFormValue());
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(brand.name)) {
      toast.error("Brand name required !");
    } else {
      const result = await createUpdateBrandRequest(brand, objectId);
      if (result === true) {
        navigate("/brand/list");
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full mt-10 flex justify-center">
      <div className="w-[60%]  bg-white shadow-md rounded-md p-7 mt-8">
        <h1 className="font-bold text-gray-500 text-center mt-2 mb-3">
          Brand Form
        </h1>
        <form>
          <div className="flex flex-col space-y-7">
            <Input
              type="text"
              name="name"
              onChange={handleChange}
              value={brand.name}
              label="Brand Name"
            />

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

export default BrandForm;
