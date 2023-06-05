import { useState } from "react";
import { register } from "../hooks/auth";
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "../components/Buttons/LoadingButton";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setToken, setUser } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      const { user, token } = await register(name, email, password, userTags);
      setUser(user);
      setToken(token);
      setLoading(false);
      toast.success("Registered successfully");
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (error.response?.data === "User already exists") {
        toast.error("User already exists");
        return;
      }
      toast.error("Something went wrong, please try again");
    }
  };

  const tags = ["tech", "blockchain", "math", "politics"];

  const [userTags, setUserTags] = useState([]);

  function handleClick(tag) {
    if (!userTags.includes(tag)) {
      setUserTags([...userTags, tag]);
    }
  }

  return (
    <div className="mt-20 flex-col w-full flex items-center justify-center">
      <h1 className="text-center font-medium text-2xl text-black mb-6">
        Register
      </h1>
      <div className="flex flex-col justify-center">
        <div className="">
          <div className="bg-white rounded-lg shadow-lg border p-5">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded-lg w-full py-2 mt-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setName(e.target.value)}
                  id="email"
                  type="name"
                  placeholder="name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded-lg w-full py-2 mt-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border mt-1 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="flex items-center justify-between">
                <LoadingButton
                  isLoading={loading}
                  onClick={handleSubmit}
                  text="Register"
                />
              </div>
            </form>
            {/* Route to login */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  className="text-violet-500 hover:text-violet-700 font-semibold"
                  to="/login"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-16 mb-8 w-full flex justify-center text-xs font-bold text-black">
          {userTags.map((t, i) => (
            <p key={i} className="mx-2">
              {t}
            </p>
          ))}
        </div>
        <div className="grid gap-4 grid-cols-4">
          {tags.map((t, i) => (
            <Chip key={i} text={t} handleClick={handleClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

function Chip({ text, handleClick }) {
  return (
    <button
      onClick={() => handleClick(text)}
      className="px-2 text-center text-sm font-bold text-white py-1 bg-purple-500 bg-opacity-75 border-2 border-purple-800 cursor-pointer rounded-full"
    >
      {text}
    </button>
  );
}

export default Register;
