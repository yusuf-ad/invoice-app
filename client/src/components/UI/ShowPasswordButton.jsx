import { useState } from "react";

export function ShowPasswordButton({ isPassword, inputElement }) {
  const [active, setActive] = useState(false);

  function handleToggle() {
    if (active) {
      inputElement.current.type = "password";
    } else {
      inputElement.current.type = "text";
    }

    setActive(!active);
  }

  return (
    <span
      onClick={handleToggle}
      className={`absolute z-10 flex w-10  rounded-r-lg justify-center items-center h-full  cursor-pointer right-0 center-y ${
        isPassword ? "inline-block" : "hidden"
      } `}
    >
      <i className={`fa-regular fa-eye ${active ? "hidden" : ""}`}></i>
      <i className={`fa-solid fa-eye-slash ${!active ? "hidden" : ""}`}></i>
    </span>
  );
}
