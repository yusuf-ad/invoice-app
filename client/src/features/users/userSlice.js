import { createSlice } from "@reduxjs/toolkit";

import { BASE_URL } from "../../utils/BASE_URL";
import { setCookie } from "../../utils/setCookie";

const initialState = {
  fullName: "",
  email: "",
  username: "",
  password: "",
  photo: "",
  token: "",
  errorMsg: {},
  isLoggedUserLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedInUser(state, action) {
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.photo = action.payload.photo;
      state.token = action.payload.token;
      state.isLoggedUserLoading = false;
      state.errorMsg = "";
    },
    logOutUser(state) {
      state.fullName = "";
      state.email = "";
      state.username = "";
      state.password = "";
      state.photo = "";
      state.token = "";
      state.errorMsg = {};
      state.isLoggedUserLoading = false;
    },
    signup(state, action) {
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.photo = action.payload.photo;
      state.token = action.payload.token;
      state.errorMsg = "";
    },
    login(state, action) {
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.photo = action.payload.photo;
      state.token = action.payload.token;
      state.errorMsg = "";
    },
    displayError(state, action) {
      state.errorMsg = action.payload;
    },
    isUserLoading(state) {
      state.isLoggedUserLoading = true;
    },
  },
});

export function signup(newUser) {
  // we will dispatch a function
  // ! redux will know that is a async operation

  return async function (dispatch) {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const { data, token } = await res.json();

      setCookie(token);

      const currentUser = { ...data.user, token };

      dispatch({ type: "user/signup", payload: currentUser });
    } catch (err) {
      dispatch({
        type: "user/displayError",
        payload: "User couldn't be created, please try again! ",
      });
    }
  };
}

export function login({ username, password }) {
  return async function (dispatch) {
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

        dispatch({
          type: "user/displayError",
          payload: { message, status: res.status },
        });

        throw new Error(message);
      }

      const { user, token } = await res.json();

      setCookie(token);

      const currentUser = { ...user, token };

      dispatch({ type: "user/login", payload: currentUser });
    } catch (err) {
      console.error(err.message);
    }
  };
}

// create action creators
export const { displayError, loggedInUser, logOutUser, isUserLoading } =
  userSlice.actions;

// export userSlice's reducer
export default userSlice.reducer;
