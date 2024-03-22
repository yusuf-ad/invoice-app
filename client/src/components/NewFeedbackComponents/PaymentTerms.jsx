import { useEffect, useRef, useState } from "react";
import { DropdownItem } from "./DropdownMenu/DropdownItem";
import { DropdownMenu } from "./DropdownMenu/DropdownMenu";

export function PaymentTerms({ setNewInvoice }) {
  const [isActive, setIsActive] = useState(false);

  const [paymentTerm, setPaymentTerm] = useState("Net 7 Days");

  const termInput = useRef(null);
  const dropdownMenu = useRef(null);

  function handleClick(e) {
    setIsActive(!isActive);

    if (e.target.textContent) {
      setPaymentTerm(e.target.textContent);
    }
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        !termInput.current.contains(e.target) &&
        !dropdownMenu.current.contains(e.target)
      ) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    setNewInvoice((invoice) => ({ ...invoice, paymentTerms: paymentTerm }));
  }, [setNewInvoice, paymentTerm]);

  return (
    <div className="space-y-2">
      <label className="text-gray-400 text-xs font-medium capitalize">
        Payment terms
      </label>
      <div onClick={handleClick} className="relative">
        <input
          name="paymentTerms"
          ref={termInput}
          className="cursor-pointer w-full text-xs py-4 px-4 border-2 rounded-md border-gray-300/50 font-bold focus:outline-purple/50 duration-100 transition-colors hover:border-purple/50"
          type="text"
          value={paymentTerm}
          readOnly
        />
        <img
          className="absolute right-6 top-0 center-y"
          src="./assets/icon-arrow-down.svg"
          alt="arrow-down"
        />
        <DropdownMenu dropdownMenu={dropdownMenu} isActive={isActive}>
          <DropdownItem>Net 1 day</DropdownItem>
          <DropdownItem>Net 7 days</DropdownItem>
          <DropdownItem>Net 14 days</DropdownItem>
          <DropdownItem>Net 30 days</DropdownItem>
        </DropdownMenu>
      </div>
    </div>
  );
}
