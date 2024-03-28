import { useIsAuthenticated } from "../../features/authentication/useIsAuthenticated";
import AppHeader from "./AppHeader";

import { Outlet } from "react-router-dom";

function AppLayout() {
  useIsAuthenticated();

  return (
    <>
      <AppHeader />

      <main className="relative min-h-full py-28 xl:py-20 px-8">
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
