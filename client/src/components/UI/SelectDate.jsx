import { forwardRef } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCalculateWidth } from "../../hooks/useCalculateWidth";

function SelectDate({ startDate }) {
  const { ref: container, width } = useCalculateWidth();

  return (
    <div ref={container} className="relative flex ">
      <DatePicker
        dateFormat={"dd MMM yyyy"}
        selected={startDate}
        customInput={<ExampleCustomInput width={width} />}
        minDate={startDate}
        maxDate={startDate}
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
    className={`rounded-md border-2 border-gray-300/50  px-4 py-3 text-sm font-bold focus:border-purple`}
  >
    <p className="flex justify-between">
      <span className="mr-2 text-gray-700">{value}</span>
      <span>
        <i
          className={`fa-regular fa-calendar text-blue-default text-sm transition duration-300 `}
        ></i>
      </span>
    </p>
  </button>
));

ExampleCustomInput.displayName = "ExampleCustomInput";
