import { createContext, useState } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    setUser({ name: res.data.name, email: res.data.email, role: res.data.role });
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await API.post("/auth/register", { name, email, password });
    setUser({ name: res.data.name, email: res.data.email, role: res.data.role });
    return res.data;
  };

  const logout = () => {
    setUser(null);

  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
