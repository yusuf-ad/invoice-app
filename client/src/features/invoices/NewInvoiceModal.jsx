import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../features/modalSlice";
import CreateInvoiceForm from "./CreateInvoiceForm";

function NewInvoiceModal() {
  const { isModalActive } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const overlay = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (overlay.current.contains(event.target)) {
        dispatch(closeModal());
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  return (
    <>
      <div
        className={`${
          isModalActive
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }  fixed inset-0 top-20 z-20 w-full overflow-y-scroll bg-white transition-all duration-300 md:w-2/3 xl:top-0 xl:w-1/2 xl:pl-28 dark:bg-skin-mirage2`}
      >
        <CreateInvoiceForm />
      </div>
      {/* overlay */}
      <div
        ref={overlay}
        className={`${
          isModalActive
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        } fixed inset-0 z-10 h-screen w-full bg-black/50 transition-opacity duration-100`}
      ></div>
    </>
  );
}

export default NewInvoiceModal;
