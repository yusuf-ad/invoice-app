import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useIsAuthenticated() {
  const { isAuthenticated } = useSelector((state) => state?.user?.userInfo) ?? {
    isAuthenticated: false,
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app");
    }
  }, [navigate, isAuthenticated]);
}
