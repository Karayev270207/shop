import { useEffect, useState } from "react";
import { InputCreate} from "../context/loginContext";
import { apiCreateEffect } from "../context/apiContext";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import cross from "../icons/cross.png";

const Cart = () => {
  const cart = apiCreateEffect((state) => state.cart);
  const addToCart = apiCreateEffect((state) => state.addToCart);
  const minusCart = apiCreateEffect((state) => state.minusCart);
  const removeCart = apiCreateEffect((state) => state.removeCart);

  const users = InputCreate((state) => state.users);
  const [suma, setSuma] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const resultPrice = cart.reduce((s, x) => s + x.price * x.quantity, 0);
    setSuma(resultPrice);
  }, [cart]);

  useEffect(() => {
    if (users === null) {
      navigate("/login");
    }
  }, [users]);
  return (
    <>
      <h2>Cart</h2>
      <h1 className="suma">Sum: {suma}$</h1>
      <div className="containerCart">
        {cart.map((c) => {
          return (
            <div key={c.id} className="boxCart">
              <div className="boxcross">
                <img onClick={() => removeCart(c.id)} src={cross} width={25} alt="" />
              </div>
              <div>
                {c.name} {c.model} x {c.quantity}
              </div>
              <p>Price:${c.price * c.quantity}</p>
              <div className="buttonBox">
                <button className="minus" onClick={() => minusCart(c)}>
                  -
                </button>
                <button className="add" onClick={() => addToCart(c)}>
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <button>deliver</button>
    </>
  );
};
export default Cart;
