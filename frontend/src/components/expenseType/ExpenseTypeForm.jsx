import React, { useEffect, useState } from "react";
import Input from "../../utility/Input.jsx";
import { useSelector } from "react-redux";
import { setLoader } from "../../redux/slice-slate/loaderSlice.js";
import {
  ResetFormValue,
  setFormValue,
} from "../../redux/slice-slate/expenseTypeSlice.js";
import store from "../../redux/store.js";
import { isEmpty } from "../../utility/formHelper.jsx";
import { toast } from "react-hot-toast";
import {
  createUpdateExpenseTypeRequest,
  getExpenseService,
} from "../../api/ApiExpenseType.jsx";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../utility/Loader.jsx";

const ExpenseTypeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const loader = useSelector((state) => state.loader.values);
  const expenseType = useSelector((state) => state.expenseType.FormValue);
  console.log(expenseType);

  const [objectId, SetObjectID] = useState(id || 0);

  useEffect(() => {
    if (id) {
      SetObjectID(id);
      (async () => {
        const success = await getExpenseService(id);
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
    if (isEmpty(expenseType.name)) {
      toast.error("Expense name required !");
    } else {
      const result = await createUpdateExpenseTypeRequest(
        expenseType,
        objectId
      );
      if (result === true) {
        navigate("/expenseType/list");
      }
    }
  };

  if (loader) {
    return <Loader />;
  }
  return (
    <div className="w-full mt-10 flex justify-center">
      <div className="w-[60%]  bg-white shadow-md rounded-md p-7 mt-8">
        <h1 className="font-bold text-gray-500 text-center mt-2 mb-3">
          Expense Type Form
        </h1>
        <form>
          <div className="flex flex-col space-y-7">
            <Input
              type="text"
              name="name"
              onChange={handleChange}
              value={expenseType.name}
              label="Expense Name"
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

export default ExpenseTypeForm;
