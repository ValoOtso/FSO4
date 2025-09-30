import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    logIn(state, action) {
      return action.payload;
    },
  },
});

export const userLogIn = (credentials) => {
  return async (dispatch) => {
    try {
      const loggedUser = await loginService.login(credentials);
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(loggedUser),
      );
      blogService.setToken(loggedUser.token);
      dispatch(logIn(loggedUser));
    } catch (error) {
      throw error;
    }
  };
};

export const { logIn } = loginSlice.actions;
export default loginSlice.reducer;
