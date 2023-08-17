import { getToken } from "../router/sessionHelper";
import { setLoader } from "../redux/slice-slate/loaderSlice";
import {
    ResetFormValue,
    setFormValue,
    setExpenseTypeList,
    setExpenseTypeListTotal,
} from "../redux/slice-slate/expenseTypeSlice.js";
import { toast } from "react-hot-toast";
import store from "../redux/store";
import axios from "axios";
import {setSupplierList, setSupplierListTotal} from "../redux/slice-slate/supplierSlice.js";

let API = "http://localhost:5000/api/expenseType";

const token = getToken();

const AxiosHeader = {
    headers: {
        "Content-Type": "application/json",
        token: `Bearer${token}`,
    },
};

export const createUpdateExpenseTypeRequest = async (formValue, objectId) => {
    try {
        store.dispatch(setLoader(true));
        let URL = `${API}/create`;
        if (objectId !== 0) {
            URL = `${API}/update/${objectId}`;
        }
        const result = await axios.post(URL, formValue, AxiosHeader);
        if (result.status === 201 && result.data.success === true) {
            toast.success("Request success!");
            store.dispatch(setLoader(false));
            store.dispatch(ResetFormValue());
            return true;
        } else {
            toast.error("Request Fail! Try Later");
            store.dispatch(setLoader(false));
            return false;
        }
    } catch (error) {
        console.log(error.response.data);
        toast.error(error.response.data);
        store.dispatch(setLoader(false));
        return false;
    }
};

export const expenseTypeListService = async (pageNo, perPage, searchValue) => {
    try {
        store.dispatch(setLoader(true));
        let URL = `${API}/get/${pageNo}/${perPage}/${searchValue}`;
        const result = await axios.get(URL, AxiosHeader);
        if (result.status === 200 && result.data.success === true) {
            if (result.data["data"][0]["rows"].length > 0) {
                store.dispatch(setExpenseTypeList(result.data["data"][0]["rows"]));
                store.dispatch(setExpenseTypeListTotal(result.data["data"][0]["total"]));
            } else {
                store.dispatch(setExpenseTypeList([]));
                store.dispatch(setExpenseTypeListTotal(0));
                toast.error("No Data Found");
            }
        } else {
            toast.error("Something went wrong!");
        }
    } catch (err) {
        console.log(err)
        let errMsg = "Something went wrong!";
        if (err.response) {
            errMsg = err.response.data;
        } else {
            errMsg = "Something went wrong!";
        }
        toast.error(errMsg);
    } finally {
        store.dispatch(setLoader(false));
    }
};

export const getExpenseService = async (id) => {
    try {
        let URL = `${API}/get/${id}`;
        store.dispatch(setLoader(true));
        const result = await axios.get(URL, AxiosHeader);
        store.dispatch(setLoader(false));
        if (result.status === 200 && result.data.success === true) {
            let FormValue = result.data["expenseType"][0];
            store.dispatch(setFormValue({ name: "name", value: FormValue.name }));
            return true;
        } else {
            toast.error("Request Fail! Try Again");
            return false;
        }
    } catch (error) {
        toast.error(error.response.data);
        store.dispatch(setLoader(false));
        return false;
    }
};

export const deleteExpenseTypeRequest = async (objectId) => {
    try {
        let URL = `${API}/delete/${objectId}`;
        store.dispatch(setLoader(true));
        const result = await axios.delete(URL, AxiosHeader);
        if (result.status === 200 && result.data.status === 'associate') {
            toast.error(result.data.data); // Use result.data.message
            store.dispatch(setLoader(false));
            return false;
        } else {
            toast.success("Delete success!");
            return true
        }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data);
        store.dispatch(setLoader(false));
        return false;
    }
};


