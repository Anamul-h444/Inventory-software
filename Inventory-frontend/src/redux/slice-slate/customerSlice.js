import { createSlice } from "@reduxjs/toolkit";

export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    List: [],
    ListTotal: 0,
    FormValue: {},
  },
  reducers: {
    setCustomerList: (state, action) => {
      state.List = action.payload;
    },
    setCustomerListTotal: (state, action) => {
      state.ListTotal = action.payload;
    },
    setFormValue: (state, action) => {
      state.FormValue = action.payload;
    },
  },
});
export const { setCustomerList, setCustomerListTotal, setFormValue } =
  customerSlice.actions;
export default customerSlice.reducer;
