import iconPlus from "../../public/assets/icon-plus.svg";

import { useDispatch } from "react-redux";

export function ButtonNewInvoice({ toggleModal }) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(toggleModal());
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center rounded-full bg-skin-purple px-3 py-2 text-sm font-bold tracking-wider text-white transition-opacity duration-300 hover:opacity-75
      "
    >
      <div className="relative rounded-full bg-white p-4">
        <img
          className="center-xy absolute ml-[1px] h-3 w-3"
          src={iconPlus}
          alt="icon plus"
        />
      </div>
      <span className="ml-3 mr-1">New</span>
      <span className="hidden  md:inline-block">Invoice</span>
    </button>
  );
}
