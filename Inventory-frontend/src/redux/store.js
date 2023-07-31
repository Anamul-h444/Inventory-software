import { configureStore } from "@reduxjs/toolkit";

import customerReducer from "./slice-slate/customerSlice";
import loaderReducer from "./slice-slate/loaderSlice";

export default configureStore({
  reducer: {
    customer: customerReducer,
    loader: loaderReducer,
  },
});
