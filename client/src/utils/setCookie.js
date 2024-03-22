import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

export function setCookie(token) {
  const cookies = new Cookies();

  const decoded = jwtDecode(token);

  cookies.set("jwt", token, {
    expires: new Date(decoded.exp * 1000),
  });
}
