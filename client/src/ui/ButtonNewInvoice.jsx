import { useDispatch } from "react-redux";

export function ButtonNewInvoice({ toggleModal }) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(toggleModal());
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center text-white text-sm font-bold px-3 py-2 rounded-full bg-purple transition-opacity duration-300 hover:opacity-75"
    >
      <div className="relative bg-white p-4 rounded-full">
        <img
          className="w-3 h-3 absolute center-xy ml-[1px]"
          src="./assets/icon-plus.svg"
          alt="icon plus"
        />
      </div>
      <span className="ml-3 mr-1">New</span>
      <span className="hidden md:inline-block">Invoice</span>
    </button>
  );
}
