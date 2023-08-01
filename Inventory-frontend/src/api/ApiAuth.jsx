import axios from "axios";
import { userInfo } from "../router/auth";

const user = userInfo();
const token = user.token;
const id = user._id;

let API = "http://localhost:5000/api/user";
const AxiosHeader = { headers: { token: `Bearer${token}` } };

export const register = (user) => {
  return axios.post(`${API}/registration`, user, AxiosHeader);
};

export const login = (user) => {
  return axios.post(`${API}/login`, user, AxiosHeader);
};

export const update = (user) => {
  return axios.post(`${API}/update/${id}`, user, AxiosHeader);
};
