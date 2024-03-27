import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "../../components/UI/ArrowLeft";
import { InvoiceStatus } from "../../components/UI/InvoiceStatus";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getInvoice } from "./invoiceSlice";
import Loader from "../../components/UI/Loader/Loader";
import { formattedMoney } from "../../utils/formatMoney";
import { formatDate } from "../../utils/formatDate";
import { InvoiceAddress } from "./InvoiceAddress";
import { TableItem } from "../../components/UI/TableItem";

import { toggleModal } from "../modalSlice";
import CreateInvoiceForm from "./CreateInvoiceForm";

function InvoiceDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const { newInvoice: currentInvoice, isLoading } = useSelector(
    (state) => state.invoices
  );

  useEffect(() => {
    if (currentInvoice.invoiceId !== id) {
      dispatch(getInvoice(token, id));
    }

    document.title = `Invoice #${id} | Invoice App`;

    // Cleanup function
    return () => {
      document.title = "Invoice App";
    };
  }, [dispatch, id, token, currentInvoice.invoiceId]);

  return (
    <>
      <div className="container mt-4 xl:mt-0 max-w-2xl">
        <header>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-4 group"
          >
            <ArrowLeft />
            <span className="font-bold text-sm group-hover:text-baliHai">
              Go back
            </span>
          </button>
        </header>
        <div>
          {isLoading ? (
            <div className="flex items-center justify-center h-[35vh]">
              <Loader />
            </div>
          ) : (
            <>
              <div className="flex text-sm text-baliHai justify-between w-full bg-white rounded-md mt-8 py-6 px-6">
                <div className="flex items-center gap-6">
                  <p>Status</p>
                  <InvoiceStatus status={currentInvoice.status} />
                </div>
                <div className="space-x-3">
                  <button
                    onClick={() => dispatch(toggleModal())}
                    className="btn-sm text-shipCove bg-offWhite"
                  >
                    Edit
                  </button>
                  <button className="btn-sm text-offWhite bg-burntSienna">
                    Delete
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-md px-6 py-8 mt-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold text-xs text-baliHai">
                      #
                      <span className="text-black text-sm">
                        {currentInvoice.invoiceId}
                      </span>
                    </p>
                    <p className="text-baliHai mt-1 text-sm">
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
                    <h3 className="text-sm text-shipCove mb-2">Invoice Date</h3>
                    <p className="font-bold text-lg text-black mb-6">
                      {formatDate(new Date(currentInvoice.createdAt))}
                    </p>
                    <h3 className="text-sm text-shipCove mb-2 ">Payment due</h3>
                    <p className="font-bold text-lg text-black mb-6">
                      {currentInvoice.paymentDue}
                    </p>
                  </div>
                  <div className="basis-1/4">
                    <h3 className="text-sm text-shipCove mb-2">Bill to</h3>
                    <p className="font-bold text-lg text-black mb-6">
                      {currentInvoice.clientName}
                    </p>
                    <InvoiceAddress address={currentInvoice.clientAddress} />
                  </div>
                  <div className="text-left flex-1 flex justify-center ">
                    <div>
                      <h3 className="text-sm text-shipCove mb-2">Sent To</h3>
                      <p className="font-bold text-lg text-black mb-6 lowercase">
                        {currentInvoice.clientEmail}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-md overflow-hidden shadow-sm mt-12">
                  <div className="bg-offWhite px-6 py-10 pb-6">
                    <table className="w-full">
                      <thead className="text-shipCove text-xs">
                        <tr>
                          <th className="text-left pb-6">Item Name</th>
                          <th className="text-right pb-6">QTY.</th>
                          <th className="text-right pb-6">Price</th>
                          <th className="text-right pb-6">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentInvoice.items.map((item, index) => (
                          <TableItem key={index} item={item} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="text-white flex items-center justify-between py-6 px-6 bg-otherDark">
                    <p className="text-sm">Amount Due</p>
                    <h2 className="font-bold text-lg">
                      ${formattedMoney(currentInvoice.total)}
                    </h2>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <CreateInvoiceForm />
    </>
  );
}

export default InvoiceDetails;
