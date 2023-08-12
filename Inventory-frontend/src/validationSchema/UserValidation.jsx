import * as Yup from "yup";

export const userValidation = Yup.object({
  firstName: Yup.string().required("Required !"),
  lastName: Yup.string().required("Required !"),
  mobile: Yup.string()
    .required("Required !")
    .matches(/^(?:\+?88)?01[3-9]\d{8}$/, "Invalid Mobile number !"),
  email: Yup.string()
    .required("Required !")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email!"
    ),
  password: Yup.string()
    .required("Required !")
    .min(8, "Password must be at least 8 characters !")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});
