import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";

function DeleteInvoiceButton() {
  return (
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
  );
}

export default DeleteInvoiceButton;
