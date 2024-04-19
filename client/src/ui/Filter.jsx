import { useEffect, useRef, useState } from "react";
import iconDown from "../../public/assets/icon-arrow-down.svg";
import iconCheck from "../../public/assets/icon-check.svg";

function Filter() {
  const [isActive, setIsActive] = useState(false);

  const menu = useRef();
  const button = useRef();

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
        className="flex items-center text-sm"
      >
        Filter
        <span className="ml-1 hidden md:inline-block">by status</span>
        <img className="ml-2" src={iconDown} alt="icon down" />
      </button>

      <ul
        ref={menu}
        className={`${isActive ? "block" : "hidden"} absolute right-0 z-30 mt-4 w-48 space-y-3 rounded-md bg-skin-white p-6`}
      >
        <li className=" group flex select-none items-center">
          <input
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

        <li className="group flex select-none items-center">
          <input
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
        <li className="group flex select-none items-center">
          <input
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

        {/* pending, paid */}
      </ul>
    </div>
  );
}

export default Filter;
