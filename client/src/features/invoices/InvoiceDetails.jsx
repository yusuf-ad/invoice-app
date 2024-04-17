import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useInvoice } from "./useInvoice";
import { useUpdateInvoiceStatus } from "./useUpdateInvoiceStatus";

import { ArrowLeft } from "../../ui/ArrowLeft";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Loader from "../../ui//Loader/Loader";
import Modal from "../../ui/Modal/Modal";
import { TableItem } from "../../ui/TableItem";
import { InvoiceStatus } from "./InvoiceStatus";
import { InvoiceAddress } from "./InvoiceAddress";

import { formattedMoney } from "../../utils/formatMoney";
import { formattedDate } from "../../utils/formatDate";

function InvoiceDetails() {
  const { invoice, isLoading, error, isError } = useInvoice();
  const { updateStatus, isUpdatingStatus } = useUpdateInvoiceStatus();

  const { invoice: currentInvoice } = invoice ?? {};

  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Invoice #${currentInvoice?.invoiceId} | Invoice App`;
  }, [currentInvoice?.invoiceId]);

  return (
    <>
      <div className="container mt-4 max-w-2xl xl:mt-0">
        <header>
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-4"
          >
            <ArrowLeft />
            <span className="text-sm font-bold group-hover:text-skin-shipCove">
              Go back
            </span>
          </button>
        </header>
        <div>
          {isLoading ? (
            <div className="flex h-[35vh] items-center justify-center">
              <Loader />
            </div>
          ) : isError ? (
            <p className="mt-8 ">{error.message}</p>
          ) : (
            <>
              <div className="mt-8 flex w-full justify-between rounded-md bg-white px-6 py-6 text-sm text-skin-baliHai dark:bg-skin-mirage">
                <div className="flex items-center gap-6">
                  <p>Status</p>
                  <InvoiceStatus status={currentInvoice.status} />
                </div>
                <div className="space-x-3">
                  <button className="btn-sm bg-skin-offWhite text-skin-baliHai hover:bg-gray-300 dark:bg-skin-gray dark:hover:bg-skin-gray dark:hover:opacity-70">
                    Edit
                  </button>

                  <Modal>
                    <Modal.Open opens="confirmDelete">
                      <button className="btn-sm bg-skin-burntSienna text-skin-offWhite hover:opacity-70">
                        Delete
                      </button>
                    </Modal.Open>

                    <Modal.Window name="confirmDelete">
                      <ConfirmDelete />
                    </Modal.Window>
                  </Modal>

                  {currentInvoice.status === "pending" && (
                    <button
                      onClick={() => updateStatus()}
                      className="btn-sm bg-skin-purple text-white transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-70"
                      disabled={isUpdatingStatus}
                    >
                      Mark as Paid
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-4 rounded-md bg-white px-6 py-8 dark:bg-skin-mirage">
                <div className="grid grid-cols-3 gap-8">
                  <div className="col-span-2">
                    <p className="text-xs font-bold text-skin-shipCove">
                      #
                      <span className="text-sm text-skin-black">
                        {currentInvoice.invoiceId}
                      </span>
                    </p>
                    <p className="mt-2 text-sm text-skin-baliHai">
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
                    <h3 className="mb-2 text-sm text-skin-baliHai">
                      Invoice Date
                    </h3>
                    <p className="mb-6 text-lg font-bold text-skin-black">
                      {formattedDate(new Date(currentInvoice.createdAt))}
                    </p>
                    <h3 className="mb-2 text-sm text-skin-baliHai ">
                      Payment due
                    </h3>
                    <p className="mb-6 text-lg font-bold text-skin-black">
                      {formattedDate(new Date(currentInvoice.paymentDue))}
                    </p>
                  </div>
                  <div className="basis-1/4">
                    <h3 className="mb-2 text-sm text-skin-baliHai">Bill to</h3>
                    <p className="mb-6 text-lg font-bold text-skin-black">
                      {currentInvoice.clientName}
                    </p>
                    <InvoiceAddress address={currentInvoice.clientAddress} />
                  </div>
                  <div className="flex flex-1 justify-center text-left ">
                    <div>
                      <h3 className="mb-2 text-sm text-skin-baliHai">
                        Sent To
                      </h3>
                      <p className="mb-6 text-lg font-bold lowercase text-skin-black">
                        {currentInvoice.clientEmail}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-12 overflow-hidden rounded-md shadow-sm">
                  <div className="bg-skin-offWhite px-6 py-10 pb-6 dark:bg-skin-ebony">
                    <table className="w-full">
                      <thead className="text-xs text-skin-baliHai">
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
                  <div className="flex items-center justify-between bg-skin-gray px-6 py-6 text-white dark:bg-skin-vulcan">
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
    </>
  );
}

export default InvoiceDetails;
