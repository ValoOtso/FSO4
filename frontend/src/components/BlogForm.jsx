import { useState } from "react";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { showNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [addBlogVisible, setAddBlogVisible] = useState(false);
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    const content = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    };
    setTitle("");
    setAuthor("");
    setUrl("");
    dispatch(createBlog(content));
    dispatch(
      showNotification(
        `a new blog ${content.title} by ${content.author} added`,
        5,
      ),
    );
  };

  const blogForm = () => {
    const hideWhenVisible = { display: addBlogVisible ? "none" : "" };
    const showWhenVisible = { display: addBlogVisible ? "" : "none" };
    return (
      <div>
        <div style={hideWhenVisible}>
          <button
            type="button"
            className="button btn btn-outline-dark"
            role="button"
            onClick={() => setAddBlogVisible(true)}
          >
            Add new blog
          </button>
        </div>
        <div style={showWhenVisible}>
          <form onSubmit={addBlog}>
            <div>
              Title
              <input
                placeholder="title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              Author
              <input
                placeholder="author"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              Url
              <input
                placeholder="url"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <button
              className="btn btn-success"
              role="button"
              onClick={() => setAddBlogVisible(false)}
              type="submit"
            >
              Save
            </button>
          </form>
          <button
            className="btn btn-secondary"
            role="button"
            onClick={() => setAddBlogVisible(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return <div>{blogForm()}</div>;
};

export default BlogForm;
