import { useState } from "react";
import x from "./icons/cross.png";
import shop from "./icons/shopping-cart_3916627.png";

type TypeProps = {
  image: string;
  product: string;
  model: string;
  price: number;
  click: () => void;
  setList: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        image: string;
        product: string;
        model: string;
        price: number;
      }[]
    >
  >;
};

export const MyFile = (props: TypeProps) => {
  const del = () => {
    props.setList((list) => list.filter((box) => props.image !== box.image));
  };
  const [num, setnum] = useState(0);
  function min(amount: number) {
    if (num > 0) {
      setnum((s) => s - amount);
    }
  }
  function max(amount: number) {
    setnum((s) => s + amount);
  }
  return (
    <div className="bodyLight">
      <div className="boxRemove">
        <button className="removebox" onClick={del}>
          <img src={x} width={10} alt="" />
        </button>
      </div>
      <div className="box">
        <img className="phone" src={props.image} alt="" width={186} />
        <div className="product">{props.product}</div>
        <div className="model">{props.model}</div>
        <div className="price">{props.price} TMT</div>
        <div className="boxbtn">
          <button id="min" onClick={() => min(1)}>
            -
          </button>
          <h4>{num}</h4>
          <button id="max" onClick={() => max(1)}>
            +
          </button>
        </div>
        <button className="shopbutton">
          <img src={shop} alt="" width={30} onClick={props.click} />
        </button>
      </div>
    </div>
  );
};
