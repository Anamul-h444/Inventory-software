import * as Yup from "yup";

export const customerValidation = Yup.object({
  name: Yup.string().required("Name is required!"),
  email: Yup.string()
    .required("Email is required!")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email!"
    ),
  phone: Yup.string()
    .required("Phone no required !")
    .matches(/^(?:\+?88)?01[3-9]\d{8}$/, "Invalid Mobile number !"),
  address: Yup.string().required("Address is required"),
});
