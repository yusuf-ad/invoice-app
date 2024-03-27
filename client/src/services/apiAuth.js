import { BASE_URL } from "../utils/BASE_URL";

export async function login({ username, password }) {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const { message } = await res.json();

      throw new Error(message || "An error occurred!");
    }

    const { data, token } = await res.json();

    return { data, token };
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}
