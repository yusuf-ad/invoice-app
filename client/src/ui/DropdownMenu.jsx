import { forwardRef } from "react";

const DropdownMenu = forwardRef(({ isMenuActive, items, render }, ref) => (
  <div
    ref={ref}
    className={`${
      isMenuActive ? "pointer-events-auto translate-y-14 opacity-100" : ""
    } pointer-events-none absolute top-1 z-20 w-full  translate-y-0 rounded-xl  opacity-0 shadow-xl transition-all duration-300`}
  >
    <ul>{items.map(render)}</ul>
  </div>
));

DropdownMenu.displayName = "DropdownMenu";

export default DropdownMenu;
