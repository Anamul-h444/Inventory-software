import React, { useEffect, useState } from "react";
import Input from "../../utility/Input.jsx";
import { useSelector } from "react-redux";
import store from "../../redux/store.js";
import { setFormValue } from "../../redux/slice-slate/categorySlice.js";
import { isEmpty } from "../../utility/formHelper.jsx";
import { toast } from "react-hot-toast";
import {
  createUpdateCategoryRequest,
  getCategoryService,
} from "../../api/ApiCategory.jsx";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../utility/Loader.jsx";
import { ResetFormValue } from "../../redux/slice-slate/categorySlice.js";

const CategoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isLoading = useSelector((state) => state.loader.value);
  const category = useSelector((state) => state.category.FormValue);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    store.dispatch(setFormValue({ name, value }));
  };

  const [objectId, setObjectId] = useState(0);

  useEffect(() => {
    if (id) {
      setObjectId(id);
      (async () => {
        await getCategoryService(id);
      })();
    } else {
      // Reset categoryData when transitioning from update to create
      store.dispatch(ResetFormValue());
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(category.name)) {
      toast.error("Category name required !");
    } else {
      const result = await createUpdateCategoryRequest(category, objectId);
      if (result === true) {
        navigate("/category/list");
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
          Category Form
        </h1>
        <form>
          <div className="flex flex-col space-y-7">
            <Input
              type="text"
              name="name"
              onChange={handleChange}
              value={category.name}
              label="Category Name"
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

export default CategoryForm;
