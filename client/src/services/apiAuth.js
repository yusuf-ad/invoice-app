import { BASE_URL } from "../utils/BASE_URL";

export async function login({ username, password }) {
  const res = await fetch(`${BASE_URL}/api/v1/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const { data, token } = await res.json();

  return { data, token };
}
