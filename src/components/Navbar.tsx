import { NavLink, useNavigate } from "react-router-dom";
import { InputCreate } from "../context/loginContext";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { apiCreateEffect } from "../context/apiContext";
import home from "../icons/home.png";
import list from "../icons/list.png";
import shop from "../icons/shopping-cart_3916627.png";
import logoutPNG from "../icons/exit.png";
import loginPNG from "../icons/user_3917711.png";
import addPost from "../icons/add.png";

const Navbar = () => {
  const cart = apiCreateEffect((state) => state.cart);
  const [len, setLen] = useState<string>("");
  // zustand states
  const users = InputCreate((state) => state.users);
  const logout = InputCreate((state) => state.logout);
  const loading = InputCreate((state) => state.loading);
  const navigate = useNavigate();
  useEffect(() => {
    if (users && !loading) {
      navigate("/");
    }
  }, [users, loading]);

  useEffect(() => {
    const cartLen = cart.length;
    if (cartLen > 0) {
      setLen(`(${cartLen})`);
    }
  }, [cart]);
  return (
    <>
      <div className="boxNav">
        <NavLink
          className={({ isActive }) => (isActive ? "isactive" : "notactive")}
          to={"/"}
        >
          <img src={home} width={45} alt="" />
        </NavLink>
        {users !== null && (
          <NavLink
            className={({ isActive }) => (isActive ? "isactive" : "notactive")}
            to={"/post"}
          >
            <img src={addPost} width={45} alt="" />
          </NavLink>
        )}
        <NavLink
          className={({ isActive }) => (isActive ? "isactive" : "notactive")}
          to={"/cards"}
        >
          <img src={list} width={45} alt="" />
        </NavLink>
        {users !== null && (
          <NavLink
            className={({ isActive }) => (isActive ? "isactive" : "notactive")}
            to={"/cart"}
          >
            <img src={shop} alt="" width={45} />
            {len}
          </NavLink>
        )}
        <>
          {users !== null ? (
            <button
              className="notactive"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              <img src={logoutPNG} width={45} alt="" />
            </button>
          ) : (
            <NavLink
              className={({ isActive }) =>
                isActive ? "isactive" : "notactive"
              }
              to={"/login"}
            >
              <img src={loginPNG} width={45} alt="" />
            </NavLink>
          )}
        </>
      </div>
    </>
  );
};
export default Navbar;
