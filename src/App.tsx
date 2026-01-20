import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Cards from "./components/Cards";
import Cart from "./components/Cart";
import Card from "./components/Card";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Notfound from "./components/Notfound";
import { useEffect } from "react";
import { InputCreate } from "./context/loginContext";
import Post from "./components/post";
import "./App.css";

const App = () => {
  const saveUser = InputCreate((state) => state.saveUser);
  useEffect(() => {
    saveUser();
  });
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/cards/:id" element={<Card />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
