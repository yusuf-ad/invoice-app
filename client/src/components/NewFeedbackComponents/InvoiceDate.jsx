import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function InvoiceDate({ setNewInvoice }) {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    setNewInvoice((invoice) => ({
      ...invoice,
      paymentDue: formatDate(startDate),
    }));
  }, [setNewInvoice, startDate]);

  return (
    <div className="space-y-2">
      <label
        className="text-gray-400 text-xs font-medium capitalize"
        htmlFor="invoiceDate"
      >
        Invoice Date
      </label>
      <div className="relative cursor-pointer text-xs border-2 rounded-md border-gray-300/50 font-bold focus:border-purple/50 duration-100 transition-colors">
        <img
          className="absolute right-6 top-0 center-y"
          src="./assets/icon-calendar.svg"
          alt="arrow-down"
        />
        <DatePicker
          className="outline-none py-4 px-4 cursor-pointer"
          value={formatDate(startDate)}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
    </div>
  );
}
