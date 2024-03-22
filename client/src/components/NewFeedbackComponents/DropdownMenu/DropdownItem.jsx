export function DropdownItem({ children }) {
  return (
    <li className="cursor-pointer text-xs font-bold px-4 py-4 first:rounded-t-md last:rounded-b-md last:border-b-0 border-[1px] border-b-gray-300/50 hover:text-purple">
      {children}
    </li>
  );
}
