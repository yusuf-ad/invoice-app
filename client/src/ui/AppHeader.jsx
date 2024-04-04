import { useSelector } from "react-redux";

import { HeaderLogo } from "./HeaderLogo";
import { DarkModeButton } from "./DarkModeButton";
import { UserAvatar } from "./UserAvatar";

function AppHeader() {
  const { isAuthenticated, photo } = useSelector(
    (state) => state?.user?.userInfo,
  ) ?? { isAuthenticated: false, photo: "" };

  return (
    <header className="xl: fixed top-0 z-50 flex h-20 w-full justify-between bg-ebony xl:h-screen xl:max-w-28 xl:flex-col   xl:rounded-r-3xl">
      <HeaderLogo />

      <div
        className={`relative flex items-center gap-8 xl:flex-col xl:gap-8 ${
          !isAuthenticated ? "pr-10 xl:pb-10 xl:pr-0" : ""
        }`}
      >
        <DarkModeButton />
        {isAuthenticated && <UserAvatar photo={photo} />}
      </div>
    </header>
  );
}

export default AppHeader;
