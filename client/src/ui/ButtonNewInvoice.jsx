import iconPlus from "../../public/assets/icon-plus.svg";

import Modal from "./Modal/Modal";
import CreateInvoiceForm from "../features/invoices/CreateInvoiceForm";

export function ButtonNewInvoice() {
  return (
    <Modal>
      <Modal.Open opens="createInvoice">
        <button
          className="flex items-center rounded-full bg-skin-purple px-3 py-2 text-sm font-bold tracking-wider text-white transition-opacity duration-300 hover:opacity-75
      "
        >
          <div className="relative rounded-full bg-white p-4">
            <img
              className="center-xy absolute ml-[1px] h-3 w-3"
              src={iconPlus}
              alt="icon plus"
            />
          </div>
          <span className="ml-3 mr-1">New</span>
          <span className="hidden  md:inline-block">Invoice</span>
        </button>
      </Modal.Open>

      <Modal.Window
        name={"createInvoice"}
        container={
          "fixed inset-0 top-20 z-20 w-full overflow-y-scroll bg-white transition-all duration-300 md:w-2/3 xl:top-0 xl:w-1/2 xl:pl-28 dark:bg-skin-mirage2"
        }
      >
        <CreateInvoiceForm />
      </Modal.Window>
    </Modal>
  );
}
