import { useEffect, useState } from "react";
import { InputCreate } from "../context/loginContext";
import { apiCreateEffect, type Product } from "../context/apiContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Card.css";
import buy from "../icons/shopping-cart_3916627.png";

const Card = () => {
  const users = InputCreate((state) => state.users);
  const products = apiCreateEffect((state) => state.products);
  // const selectedCars = apiCreateEffect((state) => state.selectedCars);
  const [filtered, setFilter] = useState<Product[] | []>([]);
  const buyProduct = apiCreateEffect((state) => state.addToCart);
  const { id } = useParams() as { id: string };

  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    setProduct(products.find((f) => String(f.id) == id));
  }, [id, products]);

  useEffect(() => {
    const filterCar = product ? products.filter((car) => {
      return (
        car.name.toLowerCase() === product?.name.toLowerCase() &&
        String(car.id) !== id
      )
    }):[];
    
    setFilter(filterCar);
  }, [id, product, products]);

  useEffect(() => {
    if (users === null) {
      navigate("/login");
    }
  }, [navigate, users]);
  
  const openImage = (f:Product):string => {
    console.log(f);
  return f.image ? f.image.startsWith('data:') ? f.image : "/images/" + f.image : "/images/comment-alt-dots_9821486.png";
};
  return (
    <>
      {product && users !== null && (
        <>
          <h1>Card</h1>
          <div className="containerCard">
            <div className="boxCard">
              <div>{product?.id}</div>
              <img src={openImage(product!)} width={380} alt="" />
              <div>{product?.name}</div>
              <div>{product?.model}</div>
              <div>{product?.year}</div>
              <div>{product?.price} TMT</div>
              <button
                className="shopCard"
                onClick={() => {
                  if (users) {
                    buyProduct(product!);
                  } else {
                    navigate("/login");
                  }
                }}
              >
                <img src={buy} width={27} alt="" />
              </button>
            </div>
          </div>
          <div className="container">
            {filtered.map((f) => {
              return (
                <Link to={`/cards/${f.id}`} className="box" key={f.id}>
                  <div>{f.id}</div>
                  <img src={openImage(f)} width={170} alt="" />
                  <div>{f.name}</div>
                  <div>{f.model}</div>
                  <div>{f.year}</div>
                  <div>{f.price} TMT</div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
export default Card;
