import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Users from "./components/Users";
import User from "./components/User";
import BlogInfo from "./components/BlogInfo";
import { showNotification } from "./reducers/notificationReducer";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { initializeBlogs } from "./reducers/blogReducer";
import { logIn, userLogIn } from "./reducers/loginReducer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useMatch,
} from "react-router-dom";

const BlogList = ({ blogs, user }) => {
  return (
    <div>
      <h2 className="title">Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} currentUser={user} />
      ))}
    </div>
  );
};

const App = () => {
  //const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const blogs = useSelector((state) => state.blogs);

  //blogs.sort(({ likes: a }, { likes: b }) => b - a);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(logIn(user));
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      await dispatch(userLogIn({ username, password }));
      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch(showNotification("wrong username or password", 5));
      setUsername("");
      setPassword("");
    }
  };

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    location.reload();
  };

  const loginForm = () => (
    <form className="float-end" onSubmit={handleLogin}>
      <div>
        <h2>Login</h2>
        Username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          placeholder="username"
        />
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          placeholder="password"
        />
      </div>
      <button className="btn btn-light" role="button" type="submit">
        Login
      </button>
    </form>
  );

  const padding = {
    paddingRight: 5,
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" style={padding} to={"/blogs"}>
                Blogs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={padding} to={"/users"}>
                Users
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {user && (
              <li className="nav-item">
                <span
                  className="nav-link disabled "
                  style={{
                    color: "darkgray",
                    opacity: 1,
                  }}
                >
                  {user.username} logged in{" "}
                </span>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <button className="nav-link btn" onClick={logout}>
                  Log out
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <div className="container">
        <Notification />
        {!user && loginForm()}
        <div className="float-end">{user && <BlogForm />}</div>
        <Routes>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/users/:id" element={<User />}></Route>
          <Route path="/blogs/:id" element={<BlogInfo />}></Route>
          <Route
            path="/blogs"
            element={<BlogList blogs={blogs} user={user} />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
