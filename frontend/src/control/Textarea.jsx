import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function Textarea(props) {
  const { label, name, ...rest } = props;
  return (
    <div className="flex flex-col text-sm">
      <label htmlFor={name}>{label}</label>
      <Field
        as="textarea"
        id={name}
        name={name}
        {...rest}
        className="border border-gray-400 px-4 py-2 rounded-lg  text-sm focus:outline-red-400 h-20"
      />
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Textarea;
