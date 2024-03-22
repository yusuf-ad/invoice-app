export function DropdownMenu({ children, isActive, dropdownMenu }) {
  return (
    <ul
      ref={dropdownMenu}
      className={`${
        isActive
          ? "opacity-100 translate-y-4"
          : "pointer-events-none opacity-0 -translate-y-4"
      } absolute capitalize top-12 rounded-md w-full bg-white shadow-xl transition-all duration-200`}
    >
      {children}
    </ul>
  );
}
