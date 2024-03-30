import AppHeader from "./AppHeader";

import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <AppHeader />

      <main className="relative min-h-[calc(100vh-80px)] py-28 xl:py-20 px-8">
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
