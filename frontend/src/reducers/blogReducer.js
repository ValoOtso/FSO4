import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    voteBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog,
      );
    },
    addComment(state, action) {
      const changedBlog = action.payload;
      return state.map((blog) =>
        blog.id !== changedBlog.id ? blog : changedBlog,
      );
    },
    removeBlog(state, action) {
      const blogToRemove = action.payload;
      return state.filter((blog) => blog.id !== blogToRemove.id);
    },
  },
});

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);

    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    const loggedUser = loggedUserJSON ? JSON.parse(loggedUserJSON) : null;

    const blogWithUser = {
      ...newBlog,
      user: {
        username: loggedUser.username,
        name: loggedUser.name,
        id: newBlog.user,
      },
    };

    dispatch(appendBlog(blogWithUser));
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const blogToChange = getState().blogs.find((b) => b.id === id);
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1,
    };

    const updatedBlog = await blogService.put(id, changedBlog);

    dispatch(voteBlog(updatedBlog));
  };
};

export const commentBlog = (id, comment) => {
  return async (dispatch, getState) => {
    const blogToChange = getState().blogs.find((b) => b.id === id);
    const changedBlog = {
      ...blogToChange,
      comments: [...blogToChange.comments, comment],
    };
    await blogService.comment(id, comment);
    dispatch(addComment(changedBlog));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    const blogToDelete = getState().blogs.find((b) => b.id === id);
    await blogService.remove(id);
    dispatch(removeBlog(blogToDelete));
  };
};

export const { appendBlog, setBlogs, voteBlog, removeBlog, addComment } =
  blogSlice.actions;
export default blogSlice.reducer;
