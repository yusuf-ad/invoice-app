import { InvoiceStatus } from "./InvoiceStatus";

import { formattedMoney } from "../../utils/formatMoney";
import { Link } from "react-router-dom";

export function Invoice({ invoice }) {
  return (
    <Link
      className="w-full inline-block"
      to={`/app/invoice/${invoice.invoiceId}`}
    >
      <li className="text-sm w-full bg-white py-5 px-6 cursor-pointer transition-3 rounded-md border-2 border-transparent hover:border-purple/50">
        {/* mobil */}
        <div className="md:hidden flex flex-col gap-8">
          <div className="flex justify-between ">
            <p className="font-bold text-baliHai">
              #<span className="text-black">{invoice.invoiceId}</span>
            </p>
            <p className=" text-baliHai">{invoice.clientName}</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-baliHai mb-2">Due {invoice.paymentDue}</p>
              <p className="text-black font-bold text-lg">${invoice.total} </p>
            </div>
            <InvoiceStatus status={invoice.status} />
          </div>
        </div>
        {/* desktop */}
        <div className="hidden md:flex items-center gap-12 ">
          <div className="flex items-center gap-6">
            <p className="font-bold text-baliHai">
              #<span className="text-black ">{invoice.invoiceId}</span>
            </p>
            <p className="text-baliHai">Due {invoice.paymentDue}</p>
          </div>
          <div className="flex flex-1 gap-12 justify-between ">
            <div className="flex gap-4 flex-1 items-center">
              <p className=" text-baliHai">{invoice.clientName}</p>
              <p className="text-black font-bold text-base ml-auto">
                ${formattedMoney(invoice.total)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <InvoiceStatus status={invoice.status} />
              <img
                src="./public/assets/icon-arrow-right.svg"
                alt="right chevron"
              />
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
}
