import { createContext, useContext, useEffect, useRef, useState } from "react";

const ModalContext = createContext();

export function useModal() {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
}

function Modal({ children }) {
  const [isModalActive, setIsModalActive] = useState(true);

  function close() {
    setIsModalActive(false);
  }

  function open() {
    setIsModalActive(true);
  }

  const overlay = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      console.log(overlay.current.contains(event.target));
      if (overlay.current.contains(event.target)) {
        setIsModalActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ModalContext.Provider value={{ close, open, isModalActive }}>
      <div
        className={`${
          isModalActive
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-full opacity-0"
        }  center-xy fixed z-20 w-[480px] rounded-lg bg-white p-10 transition-all duration-300 dark:bg-skin-mirage`}
      >
        {children}
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
    </ModalContext.Provider>
  );
}

export default Modal;

function OpenModal({ children }) {
  const { open } = useModal();

  return <div onClick={open}>{children}</div>;
}

function CloseModal({ children }) {
  const { open } = useModal();

  return <div onClick={open}>{children}</div>;
}
