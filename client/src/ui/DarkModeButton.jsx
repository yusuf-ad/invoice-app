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
        src={`./assets/icon-${isDarkMode ? "moon" : "sun"}.svg`}
        alt="icon moon"
      />
    </button>
  );
}
