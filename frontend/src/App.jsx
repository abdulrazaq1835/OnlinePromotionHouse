import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> 
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
