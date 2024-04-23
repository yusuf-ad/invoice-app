import { useState } from "react";

import { useClickOutside } from "../hooks/useClickOutside";

import DropdownMenu from "./DropdownMenu";

function SelectionField({ active, menuItems, setValue, setPaymentDue }) {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeField, setActiveField] = useState(
    menuItems[menuItems.findIndex((item) => item.includes(active))] ||
      menuItems[0],
  );

  const { menu, button: dropdownButton } = useClickOutside(() => {
    setIsMenuActive(false);
  });

  function toggleMenu() {
    setIsMenuActive(!isMenuActive);
  }

  function handleSelect(field) {
    const day = +field.split(" ")[1] || 1;

    const futureDate = new Date(Date.now());
    futureDate.setDate(futureDate.getDate() + day);

    setPaymentDue(futureDate);

    setActiveField(field);

    setValue("paymentTerms", field);

    toggleMenu();
  }

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        ref={dropdownButton}
        onClick={toggleMenu}
        className="w-full rounded-md border-2  border-gray-300/50  bg-white  px-4 py-3 text-sm font-bold text-skin-black placeholder:text-black/85 hover:border-skin-purple dark:border-transparent dark:bg-skin-mirage"
      >
        <p className="flex justify-between">
          <span className="mr-2  text-skin-black">{activeField}</span>
          <span>
            <i
              className={`fa-solid fa-chevron-down text-blue-default text-sm transition duration-300 ${
                isMenuActive ? "rotate-180" : "rotate-0"
              }`}
            ></i>
          </span>
        </p>
      </button>

      <DropdownMenu
        isMenuActive={isMenuActive}
        ref={menu}
        items={menuItems}
        render={(item) => (
          <DropdownItem
            handleSelect={handleSelect}
            key={item}
            isActive={item === active}
          >
            {item}
          </DropdownItem>
        )}
      />
    </div>
  );
}

function DropdownItem({ isActive, children, handleSelect }) {
  return (
    <li
      onClick={() => handleSelect(children)}
      className={`${isActive && "text-skin-purple"} flex min-h-fit cursor-pointer justify-between border-b border-b-slate-300 bg-white px-6  py-4 text-sm font-bold text-skin-black shadow-skin-whisper transition duration-300 first:rounded-t-md  last:rounded-b-md hover:text-skin-purple dark:border-b-skin-gray dark:bg-skin-mirage `}
    >
      {children}
      {isActive && (
        <span className="text-skin-purple">
          <i className="fa-solid fa-check"></i>
        </span>
      )}
    </li>
  );
}

export default SelectionField;
