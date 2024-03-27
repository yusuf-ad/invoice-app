import LoginMessage from "../components/UI/LoginMessage";

import { useIsAuthenticated } from "../features/authentication/useIsAuthenticated";

function HomePage() {
  useIsAuthenticated();

  return (
    <>
      <LoginMessage />
    </>
  );
}

export default HomePage;
