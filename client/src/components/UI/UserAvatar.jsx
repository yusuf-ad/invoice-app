import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useLogout } from "../../features/authentication/useLogout";

export function UserAvatar({ photo }) {
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  const { logout } = useLogout();

  const logOutButton = useRef(null);
  const avatar = useRef(null);

  function handleClick() {
    logout();

    navigate("/", { replace: true });
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        logOutButton.current &&
        !logOutButton.current.contains(event.target) &&
        !avatar.current.contains(event.target)
      ) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center relative h-full border-l-2 px-8 xl:w-full xl:py-8 xl:border-l-0 xl:border-t-2 xl:flex xl:justify-center border-gray-500/50">
      <button
        ref={logOutButton}
        onClick={handleClick}
        className={`${
          isActive
            ? "opacity-100 pointer-events-auto translate-y-8 xl:translate-x-8"
            : "opacity-0 pointer-events-none -translate-y-0 xl:-translate-x-0"
        } w-44 absolute z-40 right-5 top-[40px]
          xl:translate-y-0 xl:top-5 xl:-right-32  
          py-6 px-12 text-sm font-bold rounded-md transition-all duration-200
        bg-white hover:underline hover:text-purple peer`}
      >
        Log out
      </button>
      <img
        ref={avatar}
        onClick={() => setIsActive(!isActive)}
        className="cursor-pointer h-10 w-10 rounded-full transition-all duration-100 border-transparent hover:border-4 hover:border-purple hover:scale-105 peer-hover:border-4 peer-hover:border-purple peer-hover:scale-105"
        src={photo}
        alt="user avatar"
      />
    </div>
  );
}
