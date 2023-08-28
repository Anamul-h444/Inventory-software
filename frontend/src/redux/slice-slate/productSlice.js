import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    List: [],
    ListTotal: 0,
    category: [],
    brand: [],
    FormValue: {
      categoryId: "",
      brandId: "",
      name: "",
      unit: "",
      details: "",
    },
  },
  reducers: {
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setProductList: (state, action) => {
      state.List = action.payload;
    },
    setProductListTotal: (state, action) => {
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
  setCategory,
  setBrand,
  setProductList,
  setProductListTotal,
  setFormValue,
  ResetFormValue,
} = productSlice.actions;
export default productSlice.reducer;
