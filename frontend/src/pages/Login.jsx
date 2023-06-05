import { useState } from "react";
import { login } from "../hooks/auth";
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import LoadingButton from "../components/Buttons/LoadingButton";
import { Link } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { setToken, setUser } = useAuthStore();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill all fields"); 
            return;
        }
        try {
            setLoading(true);
            const { user, token } = await login(email, password);
            setUser(user);
            setToken(token);
            setLoading(false);
            toast.success("Logined successfully");
            navigate("/");
        } catch (error) {
            setLoading(false);
            if (error.response?.data){
                toast.error(error.response.data);
                return; 
            }
            toast.error("Something went wrong, please try again")
        }
    }

    return (
        <div className="mt-20 flex-col w-full flex items-center justify-center space-y-6">
            <h1 className="text-center font-semibold text-3xl text-black">Login</h1>
            <div className="flex justify-center">
                <div className="bg-white rounded-lg shadow-xl border p-8 w-full max-w-md">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                type="email"
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <LoadingButton 
                                isLoading={loading}
                                onClick={handleSubmit}
                                text="Login"
                            />
                        </div>
                    </form>
                    <div className="text-center mt-4">
                        <span className="text-gray-600 text-sm">Don't have an account? </span>
                        <Link to="/register" className="text-violet-500 hover:text-violet-600 text-sm">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;