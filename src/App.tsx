import "./App.css";
// import heart from "./icons/heart (1).png";
// import like from "./icons/heart.png";
// import { useState } from "react";
import { MyFile } from "./MyFile";
import { useState, useRef, useEffect } from "react";
import { properties } from "./properties";
import add from "./icons/paper-plane.png";
// import property from "./properties";
function App() {
  const [list, setList] = useState(properties);
  const buy = () => {
    alert("You bought");
  };

  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");

  const refUse = useRef<HTMLInputElement | null>(null);

  // const postImage = () => {
  //   refUse.current?.click();
  // };
  const post = () => {
    setImage(null);
    setTitle("");
    setModel("");
    setPrice("");
    setList((x) => {
      return x.concat({
        id: x.length + 1,
        image: image,
        product: title,
        model: model,
        price: parseInt(price),
      });
    });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  type typeAPI = {
    title: string;
    id: number;
  };
  const [userList, setUser] = useState<typeAPI[]>([]);

  useEffect(() => {
    const getUserAPI = async () => {
      const resp = await fetch("http://localhost:3000/json-todos");
      const data = await resp.json();
      setUser(data);
    };
    getUserAPI();
  }, []);
  return (
    <>
      <div className="cont">
        <button>
          <label htmlFor="post">Choose the image</label>
        </button>
        <input
          ref={refUse}
          onChange={handleFile}
          type="file"
          id="post"
          accept="image/*"
          hidden
          multiple
        />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter the Title of product"
        />
        <input
          value={model}
          onChange={(e) => setModel(e.target.value)}
          type="text"
          placeholder="Enter model of product"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          placeholder="Enter the price"
        />
        <button onClick={post}>
          <img src={add} width={24} alt="" />
        </button>
      </div>
      <div className="container">
        {list.map((x) => {
          return (
            <MyFile
              key={x.id}
              image={x.image}
              product={x.product}
              model={x.model}
              price={x.price}
              click={buy}
              setList={setList}
            />
          );
        })}
      </div>
      <div>
        {userList.map((u) => {
          return <h1>{u.title}</h1>;
        })}
      </div>
    </>
  );
}

export default App;
