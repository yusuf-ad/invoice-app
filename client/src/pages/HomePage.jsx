import { useEffect } from "react";
import LoginMessage from "../components/UI/LoginMessage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/UI/Loader/Loader";

function HomePage() {
  const navigate = useNavigate();

  const token = useSelector((state) => state.user.token);

  const isLoggedUserLoading = useSelector(
    (state) => state.user.isLoggedUserLoading
  );

  useEffect(() => {
    if (token) {
      navigate("/app");
    }
  }, [token, navigate]);

  return (
    <>
      {isLoggedUserLoading ? (
        <div className="absolute center-xy">
          <Loader />
        </div>
      ) : (
        <LoginMessage />
      )}
    </>
  );
}

export default HomePage;
