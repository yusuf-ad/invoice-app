import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export function useIsAuthenticated() {
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.get("jwt")) {
      navigate("/app");
    }
  }, [navigate]);
}
