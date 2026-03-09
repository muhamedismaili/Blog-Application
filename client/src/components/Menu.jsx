import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Menu({ cat }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`https://blog-application-b7d5.onrender.com/api/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        toast.error(err.response?.data)
      }
    }
    fetchData();
  }, [cat]);


  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img
            src={
              post.img?.startsWith("http") ? post.img : `https://blog-application-b7d5.onrender.com/upload/${post.img}`
            }
            alt={post.id}
          />
          <h2>{post.title}</h2>
          <button><Link className="link" to={`https://blog-application-b7d5.onrender.com/post/${post.id}`}>Read More!</Link></button>
        </div>
      ))}
    </div>
  );
}
