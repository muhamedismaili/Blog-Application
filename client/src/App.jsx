import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Write from "./pages/Write.jsx";
import Single from "./pages/Single.jsx";
import NavBar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";

import "./style.scss";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/post/:id", element: <Single /> },
      { path: "/write", element: <Write /> },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;