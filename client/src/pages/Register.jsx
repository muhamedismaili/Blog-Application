import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  function handleChange(e) {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  // upload image to /public/upload
  async function upload() {
    try {

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "http://localhost:8800/api/upload",
        formData
      );

      return res.data; // filename

    } catch (err) {
      toast.error(err.response?.data || "Image upload failed");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {

      let imgUrl = "";

      // upload image first
      if (file) {
        imgUrl = await upload();
      }

      // send user data + image
      const res = await axios.post("/api/auth/register", {
        ...inputs,
        img: imgUrl
      });

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

        {/* profile picture upload */}

        <div className="fileInput">

          <label htmlFor="file" className="uploadBtn">
            Add profile picture
          </label>

          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
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