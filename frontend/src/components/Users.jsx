import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "../reducers/userReducer";
import { useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  });

  const users = useSelector((state) => state.users);

  return (
    <div>
      <h2 className="title">Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          <Link className="btn btn-light" to={`/users/${user.id}`}>
            {user.name}: {user.blogs.length} blogs
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Users;
