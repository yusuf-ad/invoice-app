import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "../../components/UI/ArrowLeft";
import { InvoiceStatus } from "../../components/UI/InvoiceStatus";
import Loader from "../../components/UI/Loader/Loader";
import { TableItem } from "../../components/UI/TableItem";

import NewInvoiceModal from "./NewInvoiceModal";
import { InvoiceAddress } from "./InvoiceAddress";

import { useInvoice } from "./useInvoice";

import { formattedMoney } from "../../utils/formatMoney";
import { formatDate } from "../../utils/formatDate";

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
            <span className="text-sm font-bold group-hover:text-baliHai">
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
              <div className="mt-8 flex w-full justify-between rounded-md bg-white px-6 py-6 text-sm text-baliHai">
                <div className="flex items-center gap-6">
                  <p>Status</p>
                  <InvoiceStatus status={currentInvoice.status} />
                </div>
                <div className="space-x-3">
                  <button className="btn-sm bg-offWhite text-shipCove">
                    Edit
                  </button>
                  <button className="btn-sm bg-burntSienna text-offWhite">
                    Delete
                  </button>
                </div>
              </div>
              <div className="mt-4 rounded-md bg-white px-6 py-8">
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs font-bold text-baliHai">
                      #
                      <span className="text-sm text-black">
                        {currentInvoice.invoiceId}
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-baliHai">
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
                    <h3 className="mb-2 text-sm text-shipCove">Invoice Date</h3>
                    <p className="mb-6 text-lg font-bold text-black">
                      {formatDate(new Date(currentInvoice.createdAt))}
                    </p>
                    <h3 className="mb-2 text-sm text-shipCove ">Payment due</h3>
                    <p className="mb-6 text-lg font-bold text-black">
                      {formatDate(new Date(currentInvoice.paymentDue))}
                    </p>
                  </div>
                  <div className="basis-1/4">
                    <h3 className="mb-2 text-sm text-shipCove">Bill to</h3>
                    <p className="mb-6 text-lg font-bold text-black">
                      {currentInvoice.clientName}
                    </p>
                    <InvoiceAddress address={currentInvoice.clientAddress} />
                  </div>
                  <div className="flex flex-1 justify-center text-left ">
                    <div>
                      <h3 className="mb-2 text-sm text-shipCove">Sent To</h3>
                      <p className="mb-6 text-lg font-bold lowercase text-black">
                        {currentInvoice.clientEmail}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-12 overflow-hidden rounded-md shadow-sm">
                  <div className="bg-offWhite px-6 py-10 pb-6">
                    <table className="w-full">
                      <thead className="text-xs text-shipCove">
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
                  <div className="flex items-center justify-between bg-otherDark px-6 py-6 text-white">
                    <p className="text-sm">Amount Due</p>
                    <h2 className="text-lg font-bold">
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
