import { configureStore } from "@reduxjs/toolkit";

import customerReducer from "./slice-slate/customerSlice";
import loaderReducer from "./slice-slate/loaderSlice";
import profileReducer from "./slice-slate/profileSlice";
import supplierReducer from "./slice-slate/supplierSlice";
import expenseTypeReducer from "./slice-slate/expenseTypeSlice.js";
import brandReducer from "../redux/slice-slate/brandSlice.js";
import categoryReducer from "../redux/slice-slate/categorySlice.js";
import expenseReducer from "./slice-slate/expenseSlice";

export default configureStore({
  reducer: {
    customer: customerReducer,
    loader: loaderReducer,
    profile: profileReducer,
    supplier: supplierReducer,
    brand: brandReducer,
    category: categoryReducer,
    expenseType: expenseTypeReducer,
    expense: expenseReducer,
  },
});
