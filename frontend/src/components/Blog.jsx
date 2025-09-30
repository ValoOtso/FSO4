import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import { BrowserRouter as Router, Link } from "react-router-dom";
import deleteIcon from "../860829.png";

const Blog = ({ blog, currentUser }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id));
    }
  };

  const canRemove = currentUser?.username === blog.user?.username;

  return (
    <div className="blog">
      <div>
        <Link className="btn btn-light" to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
        {canRemove && (
          <button
            className="button delete"
            role="button"
            onClick={handleDelete}
          >
            <img src={deleteIcon} alt="Remove" className="delete-img" />
          </button>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Blog;
