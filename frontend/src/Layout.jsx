import { Outlet } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Header from "./components/Header/Header";
import useAuthStore from "./store/authStore";
import useSocketStore from "./store/socketStore";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { loginBack } from "./hooks/auth";

const Layout = () => {
  const { user, setToken, setUser } = useAuthStore();
  const { setSocket, socket } = useSocketStore();

  useEffect(() => {
    handleLoginBack();
  }, []);

  const handleLoginBack = async () => {
    try {
      const res = await loginBack();
      if (!res) {
        return;
      }
      setUser(res?.user);
      if (res?.token) {
        setToken(res.token);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    try {
      const socketConnect = io(import.meta.env.VITE_SOCKET_URI);
      setSocket(socketConnect);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (user && socket) {
      socket.emit("addUser", user.email);
    }
  }, [user, socket]);

  return (
    <div className="min-h-screen">
      <Toaster />
      <Header />
      <div className="px-20 pb-20">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
