import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../slice-state/profileSlice";

export default configureStore({
  reducer: {
    profile: profileReducer,
  },
});
