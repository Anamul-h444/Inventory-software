import { createSlice } from "@reduxjs/toolkit";

export const expenseTypeSlice = createSlice({
    name: "expenseType",
    initialState: {
        List: [],
        ListTotal: 0,
        FormValue: {
            name: "",
        },
    },
    reducers: {
        setExpenseTypeList: (state, action) => {
            state.List = action.payload;
        },
        setExpenseTypeListTotal: (state, action) => {
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
    setExpenseTypeList,
    setExpenseTypeListTotal,
    setFormValue,
    ResetFormValue,
} = expenseTypeSlice.actions;
export default expenseTypeSlice.reducer;
