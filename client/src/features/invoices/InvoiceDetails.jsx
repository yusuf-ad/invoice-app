import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "../../ui/ArrowLeft";
import Loader from "../../ui//Loader/Loader";

import { useInvoice } from "./useInvoice";
import { useUpdateInvoiceStatus } from "./useUpdateInvoiceStatus";
import { InvoiceStatus } from "./InvoiceStatus";
import { InvoiceAddress } from "./InvoiceAddress";
import EditInvoiceButton from "./EditInvoiceButton";
import DeleteInvoiceButton from "./DeleteInvoiceButton";

import ItemsTable from "../../ui/ItemsTable";
import CurrentInvoiceDetails from "./CurrentInvoiceDetails";

function InvoiceDetails() {
  const { invoice, isLoading, error } = useInvoice();
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

        <section className="mb-12 md:mb-4">
          {isLoading && (
            <div className="flex h-[35vh] items-center justify-center">
              <Loader />
            </div>
          )}

          {error && <p className="mt-8 ">{error.message}</p>}

          {!isLoading && !error && (
            <>
              <div className="mt-8 flex w-full justify-between rounded-md bg-white px-6 py-6 text-sm text-skin-baliHai dark:bg-skin-mirage">
                <div className="flex w-full items-center justify-between gap-6 md:justify-start">
                  <p>Status</p>
                  <InvoiceStatus status={currentInvoice.status} />
                </div>

                <div className="hidden items-center space-x-3 md:flex">
                  <EditInvoiceButton />

                  <DeleteInvoiceButton />

                  {currentInvoice.status === "pending" && (
                    <button
                      onClick={() => updateStatus()}
                      className="btn-sm min-w-max bg-skin-purple text-white transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-70"
                      disabled={isUpdatingStatus}
                    >
                      Mark as Paid
                    </button>
                  )}
                </div>

                <div className="fixed bottom-0 left-0 flex h-20 w-full items-center justify-center gap-3 bg-white md:hidden dark:bg-skin-mirage">
                  <EditInvoiceButton />

                  <DeleteInvoiceButton />

                  {currentInvoice.status === "pending" && (
                    <button
                      onClick={() => updateStatus()}
                      className="btn-sm min-w-max bg-skin-purple text-white transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-70"
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

                <CurrentInvoiceDetails currentInvoice={currentInvoice} />

                <ItemsTable currentInvoice={currentInvoice} />
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
}

export default InvoiceDetails;
