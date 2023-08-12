const Input = ({ name, type, onChange, label, value, ...rest }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm ">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value} // Ensure you're passing the correct value from props
        onChange={onChange} // Ensure you're passing the correct onChange handler
        {...rest}
        className="border border-gray-400 px-4 py-2 rounded-lg  text-sm focus:outline-red-400"
      />
    </div>
  );
};

export default Input;
