import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import TextError from "./TextError";

function Input(props) {
  const { label, name, type, ...rest } = props;
  const { errors, touched } = useFormikContext();
  const hasError = errors[name] && touched[name];
  return (
    <div className="relative">
      <Field
        id={name}
        name={name}
        type={type}
        {...rest}
        className={`h-10 w-full border-b-2 bg-transparent focus:outline-none placeholder-transparent relative peer disabled:opacity-70
          disabled:cursor-not-allowed
          ${hasError ? "border-red-600" : "border-white"}
          ${hasError ? "focus:border-rose-500" : "focus:border-green-500"}`}
        placeholder="demo"
      />
      <label
        htmlFor={name}
        className="absolute left-0 -top-3.5 text-sm transition-all duration-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-2  peer-focus:-top-3.5 peer-focus:text-sm cursor-text"
      >
        {label}
      </label>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Input;
