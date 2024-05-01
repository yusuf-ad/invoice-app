import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "../../ui/ArrowLeft";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Loader from "../../ui//Loader/Loader";
import Modal from "../../ui/Modal";

import { useInvoice } from "./useInvoice";
import { useUpdateInvoiceStatus } from "./useUpdateInvoiceStatus";
import { InvoiceStatus } from "./InvoiceStatus";
import { InvoiceAddress } from "./InvoiceAddress";
import EditInvoiceForm from "./EditInvoiceForm";

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

        <section>
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

                <div className="hidden space-x-3 md:block">
                  <Modal>
                    <Modal.Open opens={"editInvoice"}>
                      <button className="btn-sm bg-skin-offWhite text-skin-baliHai hover:bg-gray-300 dark:bg-skin-gray dark:hover:bg-skin-gray dark:hover:opacity-70">
                        Edit
                      </button>
                    </Modal.Open>

                    <Modal.Window
                      name={"editInvoice"}
                      container={
                        "fixed inset-0 top-20 z-20 w-full overflow-y-scroll bg-white transition-all duration-300 md:w-2/3 xl:top-0 xl:w-1/2 xl:pl-28 dark:bg-skin-mirage2 overflow-x-hidden"
                      }
                    >
                      <EditInvoiceForm />
                    </Modal.Window>
                  </Modal>

                  <Modal>
                    <Modal.Open opens="confirmDelete">
                      <button className="btn-sm bg-skin-burntSienna text-skin-offWhite hover:opacity-70">
                        Delete
                      </button>
                    </Modal.Open>

                    <Modal.Window
                      name="confirmDelete"
                      container={
                        "center-xy fixed z-20 w-[480px] rounded-lg bg-white p-10 transition-all duration-300 dark:bg-skin-mirage"
                      }
                    >
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
                <div className="fixed bottom-0 left-0 h-16 w-full bg-red-400"></div>
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
