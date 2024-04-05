import { InvoiceStatus } from "./InvoiceStatus";

import { formattedMoney } from "../../utils/formatMoney";
import { formattedDate } from "../../utils/formatDate";

import { Link } from "react-router-dom";

export function Invoice({ invoice }) {
  return (
    <Link
      className="inline-block w-full"
      to={`/app/invoice/${invoice.invoiceId}`}
    >
      <li className="transition-3 w-full cursor-pointer rounded-md border-2 border-transparent bg-white px-6 py-5 text-sm hover:border-purple/50">
        {/* mobil */}
        <div className="flex flex-col gap-8 md:hidden">
          <div className="flex justify-between ">
            <p className="font-bold text-baliHai">
              #<span className="text-black">{invoice.invoiceId}</span>
            </p>
            <p className=" text-baliHai">{invoice.clientName}</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-2 text-baliHai">
                Due {formattedDate(new Date(invoice.paymentDue))}
              </p>
              <p className="text-lg font-bold text-black">
                ${formattedMoney(invoice.total)}
              </p>
            </div>
            <InvoiceStatus status={invoice.status} />
          </div>
        </div>
        {/* desktop */}
        <div className="hidden items-center gap-12 md:flex ">
          <div className="flex items-center gap-6">
            <p className="font-bold text-baliHai">
              #<span className="text-black ">{invoice.invoiceId}</span>
            </p>
            <p className="text-baliHai">
              Due {formattedDate(new Date(invoice.paymentDue))}
            </p>
          </div>
          <div className="flex flex-1 justify-between gap-12 ">
            <div className="flex flex-1 items-center gap-4">
              <p className=" text-baliHai">{invoice.clientName}</p>
              <p className="ml-auto text-base font-bold text-black">
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
