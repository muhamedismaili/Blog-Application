import React from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Write() {
  const state = useLocation().state;
  const navigate = useNavigate();
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitile] = useState(state?.title || "");
  const [img, setImg] = useState(state?.img || "");
  const [cat, setCat] = useState(state?.cat || "");

  async function handleSubmit(e) {
    if (img.startsWith("data:image")) {
      toast.error("Please paste an image URL, not an uploaded image.");
      return;
    }

    if (img.length > 500) {
      toast.error("Image URL is too long.");
      return;
    }
    try {
      let res;
      state
        ? (res = await axios.put(
            `https://blog-application-b7d5.onrender.com/api/posts/${state.id}`,
            {
              title,
              desc: value,
              cat,
              img: img,
            },
            { withCredentials: true },
          ))
        : (res = await axios.post(
            "https://blog-application-b7d5.onrender.com/api/posts/",
            {
              title,
              desc: value,
              cat,
              img: img,
            },
            { withCredentials: true },
          ));
      toast.success(res.data);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data);
    }
  }
  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitile(e.target.value)}
          value={title}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibilty: </b> Public
          </span>
          <input
            type="text"
            placeholder="Paste image URL (https://...)"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>{" "}
          </div>{" "}
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
}
