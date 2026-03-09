import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  async function login(inputs) {
    const res = await axios.post("https://blog-application-b7d5.onrender.com/api/auth/login", inputs);
    setCurrentUser(res.data);
    toast.success("Logged in successfully!");
  }
  async function logout(inputs) {
    const res = await axios.post("https://blog-application-b7d5.onrender.com/api/auth/logout");
    setCurrentUser(null);
    toast.error("Logged out successfully!")
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
