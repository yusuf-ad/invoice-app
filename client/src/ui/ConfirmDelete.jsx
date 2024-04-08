import { useNavigate, useParams } from "react-router-dom";
import { useDeleteInvoice } from "../features/invoices/useDeleteInvoice";
import Modal from "./Modal/Modal";

function ConfirmDelete() {
  const { id: invoiceId } = useParams();

  const navigate = useNavigate();

  const { deleteInvoice, isDeleting } = useDeleteInvoice();

  function handleDelete() {
    deleteInvoice(invoiceId);

    navigate("/");
  }

  return (
    <div>
      <h3 className="text-4xl font-bold tracking-wide text-skin-black">
        Confirm Deletion
      </h3>
      <p className="mt-4 text-sm leading-6 text-skin-shipCove">
        Are you sure you want to delete invoice{" "}
        <span className="text-xs">#</span>
        <span className="text-base">{invoiceId}?</span> This action cannot be
        undone.
      </p>
      <div className="mt-6 flex justify-end gap-3">
        <Modal.Close>
          <button
            type="button"
            className="btn-sm bg-skin-gray font-bold text-white  hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-skin-gray dark:hover:bg-skin-gray dark:hover:opacity-70"
          >
            Cancel
          </button>
        </Modal.Close>

        <button
          onClick={handleDelete}
          type="submit"
          className="btn-sm bg-skin-burntSienna text-skin-offWhite hover:opacity-70"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
