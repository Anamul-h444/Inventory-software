import axios from "axios";
//import { API } from "../utlis/config";

let API = "http://localhost:5000/api/user";

export const register = (user) => {
  return axios.post(`${API}/registration`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const login = (user) => {
  return axios.post(`${API}/login`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// let API = "http://localhost:3001/api";
// export const createCategory = (token, data) => {
//   return axios.post(`${API}/category`, data, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer${token}`,
//     },
//   });
// };
