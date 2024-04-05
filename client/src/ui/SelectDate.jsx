// React Imports
import { forwardRef } from "react";

// Third-party Imports
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Hook Imports
import { useCalculateWidth } from "../hooks/useCalculateWidth";

function SelectDate({ paymentDue }) {
  const { ref: container, width } = useCalculateWidth();

  return (
    <div ref={container} className="relative flex w-full">
      <DatePicker
        dateFormat={"dd MMM yyyy"}
        selected={paymentDue}
        customInput={<ExampleCustomInput width={width} />}
        minDate={paymentDue}
        maxDate={paymentDue}
      />
    </div>
  );
}

export default SelectDate;

const ExampleCustomInput = forwardRef(({ value, onClick, width }, ref) => (
  <button
    onClick={onClick}
    ref={ref}
    type="button"
    style={{ width: `${width}px` }}
    className={`dark:bg-skin-mirage text-skin-black hover:border-skin-purple  w-full rounded-md border-2  border-gray-300/50 bg-white px-4 py-3 text-sm font-bold placeholder:text-black/85 dark:border-transparent`}
  >
    <p className="flex justify-between">
      <span className="text-skin-black mr-2">{value}</span>
      <span>
        <i
          className={`fa-regular fa-calendar text-blue-default text-sm transition duration-300 `}
        ></i>
      </span>
    </p>
  </button>
));

ExampleCustomInput.displayName = "ExampleCustomInput";
