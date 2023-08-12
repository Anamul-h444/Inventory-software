import axios from "axios";
import { toast } from "react-hot-toast";
import store from "../redux/store";
import { setLoader } from "../redux/slice-slate/loaderSlice";
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

export const getUserDetails = async () => {
  try {
    const URL = `${API}/get/details`;
    store.dispatch(setLoader(true));
    const result = await axios.get(URL, AxiosHeader);

    store.dispatch(setLoader(false));
    if (result.status === 200 && result.data.success === true) {
      const data = result.data.user[0];
      store.dispatch(setProfile(data));
      return true;
    } else {
      toast.error("Request Fail! Try Again");
      return false;
    }
  } catch (error) {
    console.log("error", error);
    toast.error(error.response.data);
    store.dispatch(setLoader(false));
    return false;
  }
};

export async function updateProfileRequest(id, userData) {
  try {
    const URL = `${API}/update/${id}`;
    store.dispatch(setLoader(true));
    const result = await axios.post(URL, userData, AxiosHeader);
    if (result.status === 200 && result.data.success === true) {
      toast.success("Update success!");
      store.dispatch(setLoader(false));
      return true;
    } else {
      toast.error("Request Fail! Try Later");
      store.dispatch(setLoader(false));
      return false;
    }
  } catch (error) {
    toast.error(error.response.data);
    store.dispatch(setLoader(false));
    return false;
  }
}
