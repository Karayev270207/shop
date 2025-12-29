import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Cards from "./components/Cards";
import Cart from "./components/Cart";
import Card from "./components/card";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/card" element={<Card />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
