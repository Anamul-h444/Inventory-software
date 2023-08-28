import React, { useEffect, useState } from "react";
import Select from "../../utility/Select";
import Input from "../../utility/Input";
import { CategoryDropdown } from "../../api/ApiCategory";
import { useSelector } from "react-redux";
import Loader from "../../utility/Loader";
import { BrandDropdown } from "../../api/ApiBrand";
import {
  setFormValue,
  ResetFormValue,
} from "../../redux/slice-slate/productSlice";
import store from "../../redux/store";
import { isEmpty } from "../../utility/formHelper";
import { toast } from "react-hot-toast";
import {
  createUpdateProductRequest,
  getProductService,
} from "../../api/ApiProduct";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.loader.value);
  const category = useSelector((state) => state.product.category);
  const brands = useSelector((state) => state.product.brand);
  const FormValue = useSelector((state) => state.product.FormValue);

  const [objectId, setObjectId] = useState(0);

  useEffect(() => {
    (async () => {
      await CategoryDropdown();
    })();
    (async () => {
      await BrandDropdown();
    })();

    if (id) {
      setObjectId(id);

      (async () => await getProductService(id))();
    } else {
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
    if (isEmpty(FormValue.categoryId)) {
      toast.error("Category is required!");
    } else if (isEmpty(FormValue.brandId)) {
      toast.error("Brand is required!");
    } else if (isEmpty(FormValue.name)) {
      toast.error("Name is required!");
    } else if (isEmpty(FormValue.unit)) {
      toast.error("Unit is required!");
    } else {
      const result = await createUpdateProductRequest(FormValue, objectId);
      if (result === true) {
        navigate("/product/list");
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[60%] bg-white shadow-md rounded-md p-7 mt-8">
        <h1 className="font-bold text-gray-500 text-center mt-2 mb-3">
          Product Form
        </h1>
        <form>
          <div className="flex flex-col space-y-7">
            <Select
              name="categoryId"
              onChange={handleChange}
              value={FormValue.categoryId}
              optionValue={category}
              title="Select Category"
            />
            <Select
              name="brandId"
              onChange={handleChange}
              value={FormValue.brandId}
              optionValue={brands}
              title="Select Brand"
            />

            <Input
              type="text"
              name="name"
              onChange={handleChange}
              value={FormValue.name}
              placeholder="Product Name"
            />

            <Input
              type="text"
              name="unit"
              onChange={handleChange}
              value={FormValue.unit}
              placeholder="Unit"
            />

            <textarea
              className="border border-gray-400 px-4 py-2 rounded-lg text-sm focus:outline-red-400 w-full"
              placeholder="Details"
              name="details"
              value={FormValue.details}
              onChange={handleChange}
            />

            <div className="w-full flex justify-center mt-10">
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

export default ProductForm;
