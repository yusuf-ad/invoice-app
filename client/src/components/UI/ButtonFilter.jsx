export function ButtonFilter() {
  return (
    <button className="ml-auto flex items-center text-sm text-black font-bold">
      Filter
      <span className="hidden md:inline-block ml-1 ">by status</span>
      <img
        className="ml-2"
        src="./assets/icon-arrow-down.svg"
        alt="icon down"
      />
    </button>
  );
}
