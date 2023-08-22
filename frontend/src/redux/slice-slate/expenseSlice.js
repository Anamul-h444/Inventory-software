import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    List: [],
    ListTotal: 0,
    expenseType: [],
    FormValue: {
      typeId: "",
      amount: "",
      note: "",
    },
  },
  reducers: {
    setExpenseType: (state, action) => {
      state.expenseType = action.payload;
    },
    setExpenseList: (state, action) => {
      state.List = action.payload;
    },
    setExpenseListTotal: (state, action) => {
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
  setExpenseList,
  setExpenseListTotal,
  setFormValue,
  ResetFormValue,
  setExpenseType,
} = expenseSlice.actions;
export default expenseSlice.reducer;
