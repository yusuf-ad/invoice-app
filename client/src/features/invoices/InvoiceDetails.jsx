import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "../../ui/ArrowLeft";
import { InvoiceStatus } from "./InvoiceStatus";
import Loader from "../../ui//Loader/Loader";
import { TableItem } from "../../ui//TableItem";

import NewInvoiceModal from "./NewInvoiceModal";
import { InvoiceAddress } from "./InvoiceAddress";

import { useInvoice } from "./useInvoice";

import { formattedMoney } from "../../utils/formatMoney";
import { formattedDate } from "../../utils/formatDate";

function InvoiceDetails() {
  const { invoice, isLoading } = useInvoice();

  const { invoice: currentInvoice } = invoice ?? {};

  const navigate = useNavigate();

  return (
    <>
      <div className="container mt-4 max-w-2xl xl:mt-0">
        <header>
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-4"
          >
            <ArrowLeft />
            <span className="group-hover:text-skin-shipCove text-sm font-bold">
              Go back
            </span>
          </button>
        </header>
        <div>
          {isLoading ? (
            <div className="flex h-[35vh] items-center justify-center">
              <Loader />
            </div>
          ) : (
            <>
              <div className="text-skin-baliHai dark:bg-skin-mirage mt-8 flex w-full justify-between rounded-md bg-white px-6 py-6 text-sm">
                <div className="flex items-center gap-6">
                  <p>Status</p>
                  <InvoiceStatus status={currentInvoice.status} />
                </div>
                <div className="space-x-3">
                  <button className="btn-sm bg-skin-offWhite text-skin-baliHai dark:bg-skin-gray dark:hover:bg-skin-gray hover:bg-gray-300 dark:hover:opacity-70">
                    Edit
                  </button>
                  <button className="btn-sm bg-skin-burntSienna text-skin-offWhite hover:opacity-70">
                    Delete
                  </button>
                  {currentInvoice.status === "pending" && (
                    <button className="btn-sm bg-skin-purple text-white transition-opacity hover:opacity-70">
                      Mark as Paid
                    </button>
                  )}
                </div>
              </div>
              <div className="dark:bg-skin-mirage mt-4 rounded-md bg-white px-6 py-8">
                <div className="grid grid-cols-3">
                  <div className="col-span-2">
                    <p className="text-skin-shipCove text-xs font-bold">
                      #
                      <span className="text-skin-black text-sm">
                        {currentInvoice.invoiceId}
                      </span>
                    </p>
                    <p className="text-skin-baliHai mt-2 text-sm">
                      {currentInvoice.description}
                    </p>
                  </div>
                  <InvoiceAddress
                    classes={"text-right"}
                    address={currentInvoice.senderAddress}
                  />
                </div>
                <div className="mt-12 flex gap-4 capitalize">
                  <div className="basis-1/4">
                    <h3 className="text-skin-baliHai mb-2 text-sm">
                      Invoice Date
                    </h3>
                    <p className="text-skin-black mb-6 text-lg font-bold">
                      {formattedDate(new Date(currentInvoice.createdAt))}
                    </p>
                    <h3 className="text-skin-baliHai mb-2 text-sm ">
                      Payment due
                    </h3>
                    <p className="text-skin-black mb-6 text-lg font-bold">
                      {formattedDate(new Date(currentInvoice.paymentDue))}
                    </p>
                  </div>
                  <div className="basis-1/4">
                    <h3 className="text-skin-baliHai mb-2 text-sm">Bill to</h3>
                    <p className="text-skin-black mb-6 text-lg font-bold">
                      {currentInvoice.clientName}
                    </p>
                    <InvoiceAddress address={currentInvoice.clientAddress} />
                  </div>
                  <div className="flex flex-1 justify-center text-left ">
                    <div>
                      <h3 className="text-skin-baliHai mb-2 text-sm">
                        Sent To
                      </h3>
                      <p className="text-skin-black mb-6 text-lg font-bold lowercase">
                        {currentInvoice.clientEmail}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-12 overflow-hidden rounded-md shadow-sm">
                  <div className="bg-skin-offWhite dark:bg-skin-ebony px-6 py-10 pb-6">
                    <table className="w-full">
                      <thead className="text-skin-baliHai text-xs">
                        <tr>
                          <th className="pb-6 text-left">Item Name</th>
                          <th className="pb-6 text-right">QTY.</th>
                          <th className="pb-6 text-right">Price</th>
                          <th className="pb-6 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentInvoice.items.map((item, index) => (
                          <TableItem key={index} item={item} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-skin-gray dark:bg-skin-vulcan flex items-center justify-between px-6 py-6 text-white">
                    <p className="text-sm">Amount Due</p>
                    <h2 className="text-xl font-bold">
                      ${formattedMoney(currentInvoice.total)}
                    </h2>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <NewInvoiceModal />
    </>
  );
}

export default InvoiceDetails;
