import { useRef } from "react";
import { apiCreateEffect } from "../context/apiContext";
import "./post.css";
import imagePost from "../icons/picture (1).png";

const Post = () => {
  const postCar = apiCreateEffect((state) => state.postCar);
  const photo = useRef<HTMLInputElement | null>(null);
  const nameCar = useRef<HTMLInputElement | null>(null);
  const modelCar = useRef<HTMLInputElement | null>(null);
  const priceCar = useRef<HTMLInputElement | null>(null);
  const yearCar = useRef<HTMLInputElement | null>(null);
  const loading = apiCreateEffect((state) => state.loading);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameValue = nameCar.current?.value ?? "";
    const modelValue = modelCar.current?.value ?? "";
    const yearValue = Number(yearCar.current?.value ?? 0);
    const priceValue = Number(priceCar.current?.value ?? 0);
    if (!photo.current?.files?.[0]) {
      alert("Photo required");
      return;
    }

    const valuePhoto = photo.current.files![0];
    const reader = new FileReader();

    reader.onloadend = async (f) => {
      if (f.target?.result) {
        await postCar({
          image: f.target?.result as string,
          name: nameValue,
          model: modelValue,
          year: yearValue,
          price: priceValue,
        });
      }
    };
    reader.readAsDataURL(valuePhoto);
  };

  return (
    <div className="bodyPost">
      <div className="containerPost">
        <div className="postCard">
          <form onSubmit={onSubmit}>
            <label htmlFor="photo"><img src={imagePost} width={40} alt="" /></label>
            <input
              id="photo"
              type="file"
              ref={photo}
              placeholder="picture"
              accept="image/*"
              hidden
            />
            <input type="text" ref={nameCar} placeholder="name of product" />
            <input type="text" ref={modelCar} placeholder="model of product" />
            <input type="number" ref={yearCar} placeholder="year of product" />
            <input
              type="number"
              ref={priceCar}
              placeholder="price of product"
            />
            <button type="submit">post</button>
          </form>
        </div>
        {loading && <h1>Loading...</h1>}
      </div>
    </div>
  );
};
export default Post;
