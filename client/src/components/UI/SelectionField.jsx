import { useState } from "react";

import { useClickOutside } from "../../hooks/useClickOutside";

import DropdownMenu from "./DropdownMenu";

function SelectionField({ menuItems, setValue }) {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeField, setActiveField] = useState(menuItems[0]);

  const { menu, button: dropdownButton } = useClickOutside(() => {
    setIsMenuActive(false);
  });

  function toggleMenu() {
    setIsMenuActive(!isMenuActive);
  }

  function handleSelect(field) {
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
        className="w-full rounded-md border-2 border-gray-300/50 px-4 py-3 text-sm font-bold "
      >
        <p className="flex justify-between">
          <span className="mr-2  text-gray-700">{activeField} </span>
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
            isActive={item === activeField}
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
      className={`${isActive && "text-purple"} flex min-h-fit cursor-pointer justify-between border-b border-b-slate-300 px-6 py-4 text-sm  font-bold  text-black transition duration-300 last:border-0 hover:text-purple `}
    >
      {children}
      {isActive && (
        <span className="text-purple">
          <i className="fa-solid fa-check"></i>
        </span>
      )}
    </li>
  );
}

export default SelectionField;
