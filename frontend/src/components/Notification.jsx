import { useSelector, useDispatch } from "react-redux";
import { clearNotification } from "../reducers/notificationReducer";
import { useEffect } from "react";

const Notification = () => {
  const dispatch = useDispatch();

  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }

  return <div className="message">{notification}</div>;
};

export default Notification;
