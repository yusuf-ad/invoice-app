import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import Overlay from "../Overlay";

const ModalContext = createContext();

export function useModal() {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
}

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider
      value={{
        close,
        open,
        openName,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useModal();

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Close({ children }) {
  const { close } = useModal();

  return cloneElement(children, { onClick: close });
}

function Window({ children, name }) {
  const { openName, close } = useModal();

  const isModalActive = name === openName;

  const overlay = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (overlay.current && overlay.current === event.target) {
        close();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);

  return createPortal(
    <Overlay ref={overlay} isModalActive={isModalActive}>
      <div
        className={`${
          isModalActive
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-full opacity-0"
        }  center-xy fixed z-20 w-[480px] rounded-lg bg-white p-10 transition-all duration-300 dark:bg-skin-mirage`}
      >
        {children}
      </div>
    </Overlay>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Close = Close;
Modal.Window = Window;

export default Modal;
