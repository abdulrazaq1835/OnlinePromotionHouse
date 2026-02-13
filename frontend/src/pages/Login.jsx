import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Login successful!");
      navigate("/") 
    } catch (err) {
      alert("Login failed!")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 md:p-8">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden"
      >
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 sm:p-4 rounded-full mb-3 sm:mb-4 shadow-lg">
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Welcome Back
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Login to your account</p>
        </div>

        <div className="mb-4 sm:mb-5">
          <label className="block text-sm sm:text-base text-gray-700 font-medium mb-2">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-3 sm:p-4 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
          />
        </div>

        <div className="mb-5 sm:mb-6">
          <label className="block text-sm sm:text-base text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 sm:p-4 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
          />
        </div>

        <button 
          className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Login Now
        </button>

        <p className="mt-5 sm:mt-6 text-center text-sm sm:text-base text-gray-600">
          Don't have an account?{" "}
          <Link 
            to="/register" 
            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold hover:underline"
          >
            Register here
          </Link>
        </p>

        <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-400 to-pink-500 opacity-10 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-red-400 to-yellow-500 opacity-10 rounded-tr-full"></div>
      </form>
    </div>
  );
};

export default Login;