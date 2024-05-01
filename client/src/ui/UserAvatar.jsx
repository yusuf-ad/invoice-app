import { useEffect, useRef, useState } from "react";

import { useLogout } from "../features/authentication/useLogout";
import { Link } from "react-router-dom";

export function UserAvatar({ photo }) {
  const [isActive, setIsActive] = useState(false);

  const { logout } = useLogout();

  const logOutButton = useRef(null);
  const avatar = useRef(null);

  function handleClick() {
    logout();
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
    <div className="relative flex h-full items-center border-l-2 border-gray-500/50 px-8 xl:flex xl:w-full xl:justify-center xl:border-l-0 xl:border-t-2 xl:py-8">
      <div
        className={`${
          isActive
            ? "pointer-events-auto translate-y-8 opacity-100 xl:translate-x-8"
            : "pointer-events-none -translate-y-0 opacity-0 xl:-translate-x-0"
        } peer absolute right-5 top-[50px] z-40
            flex w-44 flex-col justify-center gap-4 rounded-md
            bg-white  py-6 text-sm font-bold xl:-right-32 xl:top-5 xl:translate-y-0 dark:bg-skin-mirage`}
      >
        <button
          className="border-b-[1px] border-gray-500/50 pb-4
          transition-all duration-200 hover:text-skin-purple hover:underline"
        >
          <Link to={`/app/profile`}>Profile</Link>
        </button>
        <button
          className="transition-all duration-200
          hover:text-skin-purple hover:underline"
          ref={logOutButton}
          onClick={handleClick}
        >
          Log out
        </button>
      </div>

      <img
        ref={avatar}
        onClick={() => setIsActive(!isActive)}
        className="h-10 w-10 cursor-pointer rounded-full border-transparent transition-all duration-100 hover:scale-105 hover:border-4 hover:border-skin-purple peer-hover:scale-105 peer-hover:border-4 peer-hover:border-skin-purple"
        src={photo}
        alt="user avatar"
      />
    </div>
  );
}
