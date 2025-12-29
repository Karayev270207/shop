import { NavLink } from "react-router-dom";
import { useLogin, type TypeState } from "../context/loginContext";
import "./Cards.module.css";
const Navbar = () => {
  const { users, logout } = useLogin() as TypeState;
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
        <NavLink
          className={({ isActive }) => (isActive ? "isactive" : "notactive")}
          to={"/cart"}
        >
          Cart
        </NavLink>
        {users ? (
          <>
            <button onClick={() => logout()}>logout</button>
          </>
        ) : (
          <NavLink
            className={({ isActive }) => (isActive ? "isactive" : "notactive")}
            to={"/login"}
          >
            Login
          </NavLink>
        )}
      </div>
    </>
  );
};
export default Navbar;
