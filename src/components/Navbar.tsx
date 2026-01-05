import { NavLink, useNavigate } from "react-router-dom";
import { InputCreate} from "../context/loginContext";
import "./Cards.module.css";
import { useEffect, useState } from "react";
import { apiCreateEffect } from "../context/apiContext";

const Navbar = () => {
  const cart = apiCreateEffect((state) => state.cart);
  const [len, setLen] = useState<string>("");
  // zustand states 
  const users = InputCreate((state)=>state.users);
  const logout = InputCreate((state)=>state.logout);
  const navigate = useNavigate();
  useEffect(() => {
    if (users) {
      navigate("/");
    }
  }, [users]);

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
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "isactive" : "notactive")}
          to={"/cards"}
        >
          Cards
        </NavLink>
        {users !== null && (
          <NavLink
            className={({ isActive }) => (isActive ? "isactive" : "notactive")}
            to={"/cart"}
          >
            Cart {len}
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
              logout
            </button>
          ) : (
            <NavLink
              className={({ isActive }) =>
                isActive ? "isactive" : "notactive"
              }
              to={"/login"}
            >
              Login
            </NavLink>
          )}
        </>
      </div>
    </>
  );
};
export default Navbar;