import React, { useEffect, useState } from "react";
import Input from "../../utility/Input";
import { expenseTypeDropdown } from "../../api/ApiExpenseType";
import { useSelector } from "react-redux";
import Loader from "../../utility/Loader";
import { setFormValue } from "../../redux/slice-slate/expenseSlice";
import store from "../../redux/store";
import { isEmpty, isNotNumber } from "../../utility/formHelper";
import { toast } from "react-hot-toast";
import {
  createUpdateExpenseRequest,
  getExpenseService,
} from "../../api/ApiExpense";
import { useParams, useNavigate } from "react-router-dom";
import { ResetFormValue } from "../../redux/slice-slate/expenseSlice";
import Select from "../../utility/Select";

const ExpenseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isLoading = useSelector((state) => state.loader.value);
  const expenseTypes = useSelector((state) => state.expense.expenseType);
  const FormValue = useSelector((state) => state.expense.FormValue);

  const [objectId, setObjectId] = useState(0);

  useEffect(() => {
    (async () => await expenseTypeDropdown())();

    if (id) {
      setObjectId(id);
      (async () => await getExpenseService(id))();
    } else {
      store.dispatch(ResetFormValue());
    }
  }, [id]);
  console.log("id", objectId);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    store.dispatch(setFormValue({ name, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(FormValue.typeId)) {
      toast.error("Expenst Type required!");
    } else if (isEmpty(FormValue.amount)) {
      toast.error("Amount required!");
    } else if (isNotNumber(FormValue.amount)) {
      toast.error("Amount must be number!");
    } else {
      const result = await createUpdateExpenseRequest(FormValue, objectId);
      if (result === true) {
        navigate("/expense/list");
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full mt-10 flex justify-center">
      <div className="w-[50%] bg-white shadow-md rounded-md p-7 mt-8">
        <h1 className="font-bold text-gray-500 text-center mt-2 mb-3">
          Expense Form
        </h1>
        <form>
          <div className="flex flex-col space-y-7">
            <Select
              name="typeId"
              onChange={handleChange}
              value={FormValue.typeId}
              optionValue={expenseTypes}
              title="Select Expense Type"
            />

            <Input
              type="text"
              name="amount"
              onChange={handleChange}
              value={FormValue.amount}
              placeholder="Amount"
            />

            <textarea
              className="border border-gray-400 px-4 py-2 rounded-lg text-sm focus:outline-red-400 w-full"
              placeholder="Note"
              name="note"
              value={FormValue.note}
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

export default ExpenseForm;

{
  /* <select
              onChange={handleChange}
              name="typeId"
              value={FormValue.typeId}
              className="border border-gray-400 px-4 py-2 rounded-lg text-sm focus:outline-red-400 w-full cursor-pointer"
            >
              <option value="">Select Expense Type</option>
              {expenseTypes.map((expenseType, index) => {
                return (
                  <option key={index} value={expenseType._id}>
                    {expenseType.name}
                  </option>
                );
              })}
            </select> */
}
