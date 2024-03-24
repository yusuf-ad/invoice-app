import { useSelector } from "react-redux";

import { HeaderLogo } from "./HeaderLogo";
import { DarkModeButton } from "./DarkModeButton";
import { UserAvatar } from "./UserAvatar";

function AppHeader() {
  const { token: isAuthenticated, photo } = useSelector((state) => state.user);

  return (
    <header className="fixed w-full z-50 top-0 h-20 xl:max-w-28 xl:h-screen xl:rounded-r-3xl flex xl:flex-col xl: justify-between   bg-ebony">
      <HeaderLogo />

      <div
        className={`relative flex items-center gap-8 xl:gap-8 xl:flex-col ${
          !isAuthenticated ? "pr-10 xl:pr-0 xl:pb-10" : ""
        }`}
      >
        <DarkModeButton />
        {isAuthenticated && <UserAvatar photo={photo} />}
      </div>
    </header>
  );
}

export default AppHeader;
