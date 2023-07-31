import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const PlainInput = (props) => {
  const { label, name, ...rest } = props;
  return (
    <div className="flex flex-col">
      <label htmlFor="plainInput" className="text-sm">
        {label}
      </label>
      <Field
        name={name}
        id={name}
        {...rest}
        className="border border-gray-400 px-4 py-2 rounded-lg  text-sm focus:outline-red-400"
      />
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
};

export default PlainInput;
