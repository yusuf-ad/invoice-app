export async function login({ username, password }) {
  try {
    const res = await fetch(`/api/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      const { message } = data;

      throw new Error(message || "An error occurred!");
    }

    return data;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

export async function logout() {
  try {
    const res = await fetch(`/api/v1/users/logout2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (!res.ok) {
      const { message } = data;

      throw new Error(message || "An error occurred!");
    }

    return data;
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
    const data = await res.json();

    if (!res.ok) {
      const { message } = data;

      throw new Error(message || "An error occurred!");
    }

    return data;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}
