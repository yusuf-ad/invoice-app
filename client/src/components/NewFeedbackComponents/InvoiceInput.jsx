export function InvoiceInput({
  label,
  name,
  styleContainer,
  styleLabel,
  styleInput,
  value,
  type = "text",

  onChangeFunction,
}) {
  return (
    <div
      className={`${
        styleContainer ? styleContainer : ""
      } flex flex-col space-y-2`}
    >
      <label
        className={`${
          styleLabel ? styleLabel : ""
        } text-gray-400 text-xs font-medium capitalize`}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        onChange={onChangeFunction}
        value={value}
        className={`${
          styleInput ? styleInput : ""
        } w-full py-3 px-4 border-2 rounded-md border-gray-300/50 text-sm font-bold `}
        type={type}
        name={name}
      />
    </div>
  );
}
