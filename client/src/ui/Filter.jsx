import { useEffect, useRef, useState } from "react";
import iconDown from "../../public/assets/icon-arrow-down.svg";
import iconCheck from "../../public/assets/icon-check.svg";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const [activeFilters, setActiveFilters] = useSearchParams();
  const [isActive, setIsActive] = useState(false);

  const menu = useRef();
  const button = useRef();

  function handleSelect(e) {
    const filterElement = e.target.closest(".filter");

    if (filterElement) {
      const filterText = filterElement.textContent.toLowerCase();
      const checkbox = filterElement.firstElementChild;

      if (checkbox.checked) {
        activeFilters.set(filterText, true);
      } else {
        activeFilters.delete(filterText);
      }

      setActiveFilters(activeFilters);
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        button.current &&
        !button.current.contains(event.target) &&
        menu.current &&
        !menu.current.contains(event.target)
      ) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsActive]);

  return (
    <div className="relative ml-auto text-xs font-bold text-skin-black">
      <button
        ref={button}
        onClick={() => setIsActive(!isActive)}
        className="flex select-none items-center text-sm"
      >
        Filter
        <span className="ml-1 hidden md:inline-block">by status</span>
        <img
          className={`${isActive ? "rotate-180" : "rotate-0"} transition-2 ml-2`}
          src={iconDown}
          alt="icon down"
        />
      </button>

      <ul
        ref={menu}
        className={`${
          isActive
            ? "pointer-events-auto translate-y-4 opacity-100"
            : "pointer-events-none translate-y-0 opacity-0"
        }
         transition-1 absolute right-0 z-30 w-48 space-y-3 rounded-md bg-skin-white p-6`}
      >
        <li
          onClick={handleSelect}
          className="group flex select-none items-center filter"
        >
          <input
            checked={activeFilters.get("draft")}
            className="transition-1 peer 
            relative h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-sm border-2 border-transparent bg-skin-gray/10  checked:border-0
            checked:bg-skin-purple group-hover:border-skin-purple dark:bg-skin-vulcan"
            type="checkbox"
            name="draft"
            id="draft"
          />
          <label className="w-full cursor-pointer pl-3" htmlFor="draft">
            Draft
          </label>
          <img
            className="pointer-events-none  
            absolute left-7 
            hidden h-3 w-3 peer-checked:block"
            src={iconCheck}
            alt="check icon"
          />
        </li>

        <li
          onClick={handleSelect}
          className="group flex select-none items-center filter"
        >
          <input
            checked={activeFilters.get("pending")}
            className="transition-1 peer relative 
            h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-sm border-2 border-transparent bg-skin-gray/10  checked:border-0
            checked:bg-skin-purple group-hover:border-skin-purple dark:bg-skin-vulcan"
            type="checkbox"
            name="pending"
            id="pending"
          />
          <label className="w-full cursor-pointer pl-3" htmlFor="pending">
            Pending
          </label>
          <img
            className="pointer-events-none  
            absolute left-7 
            hidden h-3 w-3 peer-checked:block"
            src={iconCheck}
            alt="check icon"
          />
        </li>

        <li
          onClick={handleSelect}
          className="group flex select-none items-center filter"
        >
          <input
            checked={activeFilters.get("paid")}
            className="transition-1 peer relative 
            h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-sm border-2 border-transparent bg-skin-gray/10  checked:border-0
            checked:bg-skin-purple group-hover:border-skin-purple dark:bg-skin-vulcan"
            type="checkbox"
            name="paid"
            id="paid"
          />
          <label className="w-full cursor-pointer pl-3" htmlFor="paid">
            Paid
          </label>
          <img
            className="pointer-events-none  
            absolute left-7 
            hidden h-3 w-3 peer-checked:block"
            src={iconCheck}
            alt="check icon"
          />
        </li>
      </ul>
    </div>
  );
}

export default Filter;
