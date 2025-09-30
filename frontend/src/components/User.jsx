import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "../reducers/userReducer";
import { useEffect } from "react";

const User = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  });

  const users = useSelector((state) => state.users);
  const { id } = useParams();
  const user = users.find((u) => u.id === id);

  if (!user) return <p>User not found</p>;

  return (
    <div>
      <h1 className="title">{user.name}</h1>
      <h3>Blogs:</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
