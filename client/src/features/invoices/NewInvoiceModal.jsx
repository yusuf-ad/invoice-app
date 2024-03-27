import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../features/modalSlice";
import CreateInvoiceForm from "./CreateInvoiceForm";

export function NewInvoiceModal() {
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
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-full"
        } fixed h-[100vh-20rem] inset-0 z-20 top-20 w-full md:w-2/3 xl:w-1/2 xl:pl-28 xl:top-0  transition-all duration-300 bg-white overflow-y-scroll`}
      >
        <CreateInvoiceForm />
      </div>
      {/* overlay */}
      <div
        ref={overlay}
        className={`${
          isModalActive
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } absolute inset-0 min-h-screen w-full transition-opacity duration-100 bg-black/50 z-10`}
      ></div>
    </>
  );
}
