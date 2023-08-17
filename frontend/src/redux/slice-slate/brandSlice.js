import { createSlice } from "@reduxjs/toolkit";

export const brandSlice = createSlice({
    name: "brand",
    initialState: {
        List: [],
        ListTotal: 0,
        FormValue: {
            name: "",
        },
    },
    reducers: {
        setBrandList: (state, action) => {
            state.List = action.payload;
        },
        setBrandListTotal: (state, action) => {
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
    setBrandList,
    setBrandListTotal,
    setFormValue,
    ResetFormValue,
} = brandSlice.actions;
export default brandSlice.reducer;
