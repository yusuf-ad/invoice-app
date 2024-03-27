export async function login({ username, password }) {
  try {
    const res = await fetch(`/api/v1/users/login`, {
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

    return await res.json();
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

export async function logout() {
  try {
    const res = await fetch(`/api/v1/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const { message } = await res.json();

      throw new Error(message || "An error occurred!");
    }

    return await res.json();
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

export async function signup({ username, password, fullName, email }) {
  try {
    const res = await fetch(`/api/v1/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, fullName, email }),
    });

    if (!res.ok) {
      const { message } = await res.json();

      throw new Error(message || "An error occurred!");
    }

    return await res.json();
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}
