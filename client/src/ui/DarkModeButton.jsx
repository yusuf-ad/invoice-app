import moonIcon from "../../public/assets/icon-moon.svg";
import sunIcon from "../../public/assets/icon-sun.svg";

import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../features/darkModeSlice";
import { useEffect } from "react";

export function DarkModeButton() {
  const dispatch = useDispatch();

  const { isDarkMode } = useSelector((state) => state.darkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <button onClick={() => dispatch(toggleDarkMode())}>
      <img
        src={isDarkMode ? moonIcon : sunIcon}
        alt={`icon ${isDarkMode ? "moon" : "sun"}`}
      />
    </button>
  );
}
