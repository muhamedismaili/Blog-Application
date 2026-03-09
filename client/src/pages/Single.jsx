import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu.jsx";
import axios from "axios";
import moment from "moment";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";

export default function Single() {
  const [post, setPost] = useState({});

  const location = useLocation();

  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`https://blog-application-b7d5.onrender.com/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        toast.error(err.response?.data)
      }
    }
    fetchData();
  }, [postId]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  async function handleDelete() {
    try {
      const res = await axios.delete(`https://blog-application-b7d5.onrender.com/api/posts/${postId}`);
      navigate("/");
      toast.success(res.data)
    } catch (err) {
      toast.error(err.response?.data)
    }
  }

  return (
    <div className="single">
      <div className="content">
        {post.img && (
          <img
            src={post.img.startsWith("http") ? post.img : `https://blog-application-b7d5.onrender.com/upload/${post.img}`}
            alt=""
          />
        )}
        <div className="user">
          <img
            src={
              post.userImg?.startsWith("http")
                ? post.userImg
                : `https://blog-application-b7d5.onrender.com/upload/${post.userImg}`
            }
            alt=""
          />
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=${post.id}`} state={post}>
                <img src={Edit} alt="edit" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="edit" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        {getText(post.desc)}
      </div>
      <Menu cat={post.cat} />
    </div>
  );
}
