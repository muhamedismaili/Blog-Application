import React from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://blog-application-b7d5.onrender.com/api/posts${cat}`,
          { withCredentials: true },
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img
                src={
                  post.img?.startsWith("http")
                    ? post.img
                    : `https://blog-application-b7d5.onrender.com/upload/${post.img}`
                }
                alt={post.title}
              />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <button>
                <Link className="link" to={`/post/${post.id}`}>
                  Read More!
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
