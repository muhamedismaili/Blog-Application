import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";

export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);


  function handleChange(e) {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
        await login(inputs);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data)
    }
  }

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="username" name="username" onChange={handleChange}/>
        <input type="password" placeholder="password" name="password"  onChange={handleChange}/>
        <button onClick={handleSubmit}>LogIn</button>
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
}
