import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white shadow-lg">
      <div className="container mx-auto px-3 sm:px-4 py-3">
        <div className="flex justify-between items-center gap-2">
          <Link
            to="/"
            className="text-base sm:text-xl md:text-2xl font-bold hover:text-purple-100 transition-colors duration-200 flex-shrink-0"
          >
            <Link
              to="/"
              className="text-xl sm:text-2xl md:text-3xl font-bold hover:text-purple-100 transition-colors duration-200 flex items-baseline gap-1"
            >
              <span className="text-black">My</span>
              <span className="text-white">Community</span>
            </Link>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {user ? (
              <>
                <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-full border border-white border-opacity-30">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white text-purple-600 rounded-full flex items-center justify-center font-bold shadow-md text-xs sm:text-base">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-xs sm:text-base ml-1 sm:ml-2 hidden md:inline whitespace-nowrap">
                    {user.name}
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-lg font-bold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 text-xs sm:text-sm md:text-base whitespace-nowrap"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-lg hover:bg-white hover:bg-opacity-20 backdrop-blur-sm transition-all duration-200 font-medium border border-white border-opacity-30 text-xs sm:text-sm md:text-base whitespace-nowrap"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-purple-600 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-lg font-bold hover:bg-purple-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 text-xs sm:text-sm md:text-base whitespace-nowrap"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
