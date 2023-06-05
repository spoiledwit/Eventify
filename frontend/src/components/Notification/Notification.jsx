import { useState, useEffect } from "react";
import Styles from "./Notification.module.css";
import axios from "axios";
import useAuthStore from "../../store/authStore";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const { token } = useAuthStore();

  useEffect(() => {
    async function fetchNoti() {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URI}/notification`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("~ data", res.data);
      setNotifications(res.data.notifications);
    }
    fetchNoti();
  }, []);

  return (
    <div className={`w-full ${Styles.scr} h-full overflow-y-auto p-4`}>
      <h1 className="font-medium text-2xl mb-2">Notifications</h1>
      {notifications.length > 0 ? (
        notifications.map((n, i) => <p key={i} className="py-2 border-[1px] border-gray-500 rounded-lg px-4 my-2 text-sm text-gray-500" dangerouslySetInnerHTML={{__html: n.message}} />)
      ) : (
        <div key={1} className="flex items-center justify-center h-full">
          <h1 className="text-gray-500 font-medium text-lg">Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default Notification;
