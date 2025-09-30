import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  commentBlog,
  initializeBlogs,
} from "../reducers/blogReducer";
import { useEffect, useState } from "react";
import { likeBlog } from "../reducers/blogReducer";

const BlogInfo = () => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  });

  const handleLike = () => {
    dispatch(likeBlog(blog.id));
  };

  const writeComment = (event) => {
    event.preventDefault();
    dispatch(commentBlog(blog.id, comment));
    setComment("");
  };

  const blogs = useSelector((state) => state.blogs);
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) return <p>Blog not found</p>;

  return (
    <div>
      <h1 className="title">
        {blog.title} {blog.author}
      </h1>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes
        <button
          className="button btn btn-success"
          role="button"
          onClick={handleLike}
        >
          Like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      <h2>comments</h2>
      <form onSubmit={writeComment}>
        <input
          type="text"
          placeholder="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit" className="button btn btn-outline-dark">
          Add comment
        </button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogInfo;
