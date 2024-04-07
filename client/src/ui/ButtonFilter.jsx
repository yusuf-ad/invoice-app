import iconDown from "../../public/assets/icon-arrow-down.svg";

export function ButtonFilter() {
  return (
    <button className="ml-auto flex items-center text-sm font-bold text-skin-black">
      Filter
      <span className="ml-1 hidden md:inline-block">by status</span>
      <img className="ml-2" src={iconDown} alt="icon down" />
    </button>
  );
}
