import { createSlice } from "@reduxjs/toolkit";

export const supplierSlice = createSlice({
  name: "supplier",
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
    setSupplierList: (state, action) => {
      state.List = action.payload;
    },
    setSupplierListTotal: (state, action) => {
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
  setSupplierList,
  setSupplierListTotal,
  setFormValue,
  ResetFormValue,
} = supplierSlice.actions;
export default supplierSlice.reducer;
