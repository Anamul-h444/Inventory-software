import axios from "axios";
import { toast } from "react-hot-toast";
import store from "../redux/store";
import { setLoader, SetProfile } from "../redux/slice-slate/loaderSlice";
import { getToken } from "../router/sessionHelper";
import { setProfile } from "../redux/slice-slate/profileSlice";

let API = "http://localhost:5000/api/user";
let token = getToken();
const AxiosHeader = { headers: { token: `Bearer${token}` } };

export const register = (user) => {
  return axios.post(`${API}/registration`, user);
};

export const login = (user) => {
  return axios.post(`${API}/login`, user);
};

export const getUserDetails = (id) => {
  try {
    const URL = `${API}/get/details`;
    store.dispatch(setLoader(true));
    const result = axios.get(URL, AxiosHeader);
    store.dispatch(setLoader(false));
    if (result.status === 200 && result.data.success === true) {
      const data = result.data.user[0];
      setProfile;
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

export async function GetProfileDetails() {
  try {
    store.dispatch(ShowLoader());
    let URL = BaseURL + "/ProfileDetails";
    let res = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (res.status === 200) {
      store.dispatch(SetProfile(res.data["data"][0]));
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
  }
}
