const Select = ({
  name,
  label,
  onChange,
  value,
  key,
  title,
  optionValue,
  ...rest
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm ">
        {label}
      </label>
      <select
        onChange={onChange}
        name={name}
        value={value}
        {...rest}
        className="border border-gray-400 px-4 py-2 rounded-lg text-sm focus:outline-red-400 w-full cursor-pointer"
      >
        <option value="">{title}</option>
        {optionValue.map((option) => (
          <option value={option._id} key={option._id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
