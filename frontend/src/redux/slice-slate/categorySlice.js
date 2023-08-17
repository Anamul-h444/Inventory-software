import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        List: [],
        ListTotal: 0,
        FormValue: {
            name: "",
        },
    },
    reducers: {
        setCategoryList: (state, action) => {
            state.List = action.payload;
        },
        setCategoryListTotal: (state, action) => {
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
    setCategoryList,
    setCategoryListTotal,
    setFormValue,
    ResetFormValue,
} = categorySlice.actions;
export default categorySlice.reducer;
