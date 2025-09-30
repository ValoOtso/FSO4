import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import loginReducer from "./reducers/loginReducer";
import userReducer from "./reducers/userReducer";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    login: loginReducer,
    users: userReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
);
