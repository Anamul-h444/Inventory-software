import axios from "axios";
import { userInfo } from "../router/auth";
import { toast } from "react-hot-toast";
import store from "../redux/store";
import {
  setCustomerList,
  setCustomerListTotal,
} from "../../src/redux/slice-slate/customerSlice";
import { setLoader } from "../redux/slice-slate/loaderSlice";

let API = "http://localhost:5000/api";
const user = userInfo();
const token = user.token;

export const createCustomerService = (customer) => {
  return axios.post(`${API}/customer/create`, customer, {
    headers: {
      "Content-Type": "application/json",
      token: `Bearer${token}`,
    },
  });
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
        store.dispatch(setCustomerListTotal("0"));
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
