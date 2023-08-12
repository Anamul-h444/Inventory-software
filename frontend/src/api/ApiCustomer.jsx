import axios from "axios";
import { toast } from "react-hot-toast";
import store from "../redux/store";
import {
  setCustomerList,
  setCustomerListTotal,
  setFormValue,
  ResetFormValue,
} from "../../src/redux/slice-slate/customerSlice";
import { setLoader } from "../redux/slice-slate/loaderSlice";
import { getToken } from "../router/sessionHelper";

let API = "http://localhost:5000/api";
const token = getToken();
const AxiosHeader = {
  headers: {
    "Content-Type": "application/json",
    token: `Bearer${token}`,
  },
};

export const createCustomerService = async (customer, objectId) => {
  try {
    let URL = `${API}/customer/create`;
    if (objectId !== 0) {
      URL = `${API}/customer/update/${objectId}`;
    }
    store.dispatch(setLoader(true));
    const result = await axios.post(URL, customer, AxiosHeader);
    store.dispatch(setLoader(false));
    if (result.status === 201 && result.data.success === true) {
      toast.success("Request Success");
      store.dispatch(ResetFormValue());
      return true;
    } else {
      toast.error("Request Fail! Try Again");
    }
  } catch (err) {
    toast.error(err.response.data);
    store.dispatch(setLoader(false));
    return false;
  }
};

export const getCustomerService = async (id) => {
  try {
    let URL = `${API}/customer/get/${id}`;
    store.dispatch(setLoader(true));
    const result = await axios.get(URL, AxiosHeader);
    store.dispatch(setLoader(false));
    if (result.status === 200 && result.data.success === true) {
      let FormValue = result.data["customer"][0];
      store.dispatch(setFormValue({ name: "name", value: FormValue.name }));
      store.dispatch(setFormValue({ name: "email", value: FormValue.email }));
      store.dispatch(setFormValue({ name: "phone", value: FormValue.phone }));
      store.dispatch(
        setFormValue({ name: "address", value: FormValue.address })
      );
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

export const deleteCustomerRequest = async (objectId) => {
  try {
    let URL = `${API}/customer/delete/${objectId}`;
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

export const customerListService = async (pageNo, perPage, searchValue) => {
  try {
    store.dispatch(setLoader(true));
    let result = await axios.get(
      `${API}/customer/get/${pageNo}/${perPage}/${searchValue}`,
      {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer${token}`,
        },
      }
    );
    //console.log(result);
    if (result.status === 200 && result.data.success === true) {
      if (result.data["data"][0]["rows"].length > 0) {
        store.dispatch(setCustomerList(result.data["data"][0]["rows"]));
        store.dispatch(setCustomerListTotal(result.data["data"][0]["total"]));
      } else {
        store.dispatch(setCustomerList([]));
        store.dispatch(setCustomerListTotal(0));
        toast.error("No Data Found");
      }
    } else {
      toast.error("something went wrong1!");
    }
  } catch (err) {
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
