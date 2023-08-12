import { configureStore } from "@reduxjs/toolkit";

import customerReducer from "./slice-slate/customerSlice";
import loaderReducer from "./slice-slate/loaderSlice";
import profileReducer from "./slice-slate/profileSlice";
import supplierReducer from "./slice-slate/supplierSlice";

export default configureStore({
  reducer: {
    customer: customerReducer,
    loader: loaderReducer,
    profile: profileReducer,
    supplier: supplierReducer,
  },
});
