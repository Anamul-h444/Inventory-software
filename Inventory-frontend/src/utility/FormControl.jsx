export const Input = ({ name, type, label, onChange, value, disabled }) => (
  <div>
    <label
      className="block text-gray-700 text-sm font-[400] mb-2"
      htmlFor={name}
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      defaultValue={value}
      onChange={onChange}
      disabled={disabled}
      className="appearance-none w-56 border border-gray-500 rounded  py-3 px-3 text-gray-700  leading-tight focus:outline-none focus:border-rose-500 disabled:cursor-not-allowed disabled:bg-gray-100"
    />
  </div>
);
