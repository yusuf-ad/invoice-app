import Modal from "../../ui/Modal";
import EditInvoiceForm from "./EditInvoiceForm";

function EditInvoiceButton() {
  return (
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
  );
}

export default EditInvoiceButton;
