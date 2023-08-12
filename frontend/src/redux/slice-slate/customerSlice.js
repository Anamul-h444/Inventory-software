import { createSlice } from "@reduxjs/toolkit";

export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    List: [],
    ListTotal: 0,
    FormValue: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  },
  reducers: {
    setCustomerList: (state, action) => {
      state.List = action.payload;
    },
    setCustomerListTotal: (state, action) => {
      state.ListTotal = action.payload;
    },
    setFormValue: (state, action) => {
      state.FormValue[`${action.payload.name}`] = action.payload.value;
    },
    ResetFormValue: (state, action) => {
      Object.keys(state.FormValue).forEach((i) => (state.FormValue[i] = ""));
    },
  },
});
export const {
  setCustomerList,
  setCustomerListTotal,
  setFormValue,
  ResetFormValue,
} = customerSlice.actions;
export default customerSlice.reducer;
