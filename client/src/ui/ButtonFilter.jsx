export function ButtonFilter() {
  return (
    <button className="text-skin-black ml-auto flex items-center text-sm font-bold">
      Filter
      <span className="ml-1 hidden md:inline-block">by status</span>
      <img
        className="ml-2"
        src="./assets/icon-arrow-down.svg"
        alt="icon down"
      />
    </button>
  );
}
