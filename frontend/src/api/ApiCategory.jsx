import { getToken } from "../router/sessionHelper";
import { setLoader } from "../redux/slice-slate/loaderSlice";
import { toast } from "react-hot-toast";
import store from "../redux/store";
import axios from "axios";
import {
  ResetFormValue,
  setFormValue,
  setCategoryList,
  setCategoryListTotal,
} from "../redux/slice-slate/categorySlice.js";
import { setCategory } from "../redux/slice-slate/productSlice";

let API = "http://localhost:5000/api/category";

const token = getToken();

const AxiosHeader = {
  headers: {
    "Content-Type": "application/json",
    token: `Bearer${token}`,
  },
};

export const createUpdateCategoryRequest = async (formValue, objectId) => {
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

export const categoryListService = async (pageNo, perPage, searchValue) => {
  try {
    store.dispatch(setLoader(true));
    let URL = `${API}/get/${pageNo}/${perPage}/${searchValue}`;
    const result = await axios.get(URL, AxiosHeader);
    if (result.status === 200 && result.data.success === true) {
      if (result.data["data"][0]["rows"].length > 0) {
        store.dispatch(setCategoryList(result.data["data"][0]["rows"]));
        store.dispatch(setCategoryListTotal(result.data["data"][0]["total"]));
      } else {
        store.dispatch(setCategoryList([]));
        store.dispatch(setCategoryListTotal(0));
        toast.error("No Data Found");
      }
    } else {
      toast.error("Something went wrong!");
    }
  } catch (err) {
    console.log(err);
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

export const getCategoryService = async (id) => {
  try {
    let URL = `${API}/get/${id}`;
    store.dispatch(setLoader(true));
    const result = await axios.get(URL, AxiosHeader);
    store.dispatch(setLoader(false));
    if (result.status === 200 && result.data.success === true) {
      let FormValue = result.data["category"][0];
      store.dispatch(setFormValue({ name: "name", value: FormValue.name }));
      return true;
    } else {
      toast.error("Request Fail! Try Again");
      return false;
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data);
    store.dispatch(setLoader(false));
    return false;
  }
};

export const deleteCategoryRequest = async (objectId) => {
  try {
    let URL = `${API}/delete/${objectId}`;
    store.dispatch(setLoader(true));
    const result = await axios.delete(URL, AxiosHeader);
    if (result.status === 200 && result.data.success === true) {
      toast.success(result.data.message); // Use result.data.message
      store.dispatch(setLoader(false));
      return true;
    } else {
      toast.error("Request Fail! Try Again");
    }
  } catch (error) {
    toast.error(error.response.data);
    store.dispatch(setLoader(false));
    return false;
  }
};

export const CategoryDropdown = async () => {
  try {
    let URL = `${API}/get`;
    store.dispatch(setLoader(true));
    const result = await axios.get(URL, AxiosHeader);
    if (result.status === 200 && result.data.success === true) {
      store.dispatch(setCategory(result.data.category));
      store.dispatch(setLoader(false));
      return true;
    } else {
      toast.error("Request Fail! Try Again");
    }
  } catch (error) {
    toast.error(error.response.data);
    store.dispatch(setLoader(false));
    return false;
  }
};
