import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
  const [ img, setImg] = useState(state?.img || "");
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });


  const navigate = useNavigate();

  function handleChange(e) {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://blog-application-b7d5.onrender.com/api/auth/register",
        {
          ...inputs,
          img: img,
        },
        { withCredentials: true },
      );

      toast.success(res.data);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data || "Something went wrong");
    }
  }

  return (
    <div className="auth">
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />

        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />

        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />

        <div className="fileInput">
          <label htmlFor="file" className="uploadBtn">
            Add profile picture
          </label>

          <input
            type="text"
            placeholder="Paste image URL (https://...)"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </div>

        <button type="submit">Register</button>

        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
}
