import "./home.css";
import React from "react";
const images = [
  "/src/homeImages/audi_2025.webp",
  "/src/homeImages/bmw_2025.jpg",
  "/src/homeImages/mercedes_2025.jpg",
  "/src/homeImages/volkswagen_2025.jpg",
  "/src/homeImages/lexus_2025.webp",
  "/src/homeImages/ford.avif"
];

const Home:React.FC = () => {
  return (
    <div className="bodyHome">
      <div className="home-container">
        {images.map((src, index) => (
          <div key={index} className="image-item">
            <img src={src} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
