import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      const message = action.payload;
      return message;
    },
    clearNotification() {
      return "";
    },
  },
});

let timeoutId;

export const showNotification = (message, timeInSeconds) => {
  return (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    dispatch(setNotification(message));

    timeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, timeInSeconds * 1000);
  };
};

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
