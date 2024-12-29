import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Slider = () => {
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const images = [
    "image.png",
    "https://via.placeholder.com/800x400?text=Slide+2",
    "https://via.placeholder.com/800x400?text=Slide+3",
  ];
  const CustomLeftArrow = ({ onClick }) => (
    <button
      onClick={onClick}
    style={{
  position: "absolute",
  left: "4px", 
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "#42f5f2",
  border: "none",
  borderRadius: "50%", 
  width: "60px",
  height: "60px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 4,
}}
    >
      ❮
    </button>
  );
  const CustomRightArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        right: "4px", 
        top: "50%",
        transform: "translateY(-50%)",
        backgroundColor: "#42f5f2",
        border: "none",
        width: "60px",
        height: "60px",
        borderRadius: "50%", 
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 4,
      }}
      
    >
      ❯
    </button>
  );

  return (
    <div style={{ width: "80%", margin: "0 auto", backgroundColor: "#f0f0f0" }}>
     <Carousel
  responsive={responsive}
  infinite={true}
  autoPlay={false} 
  autoPlaySpeed={3000}
  customLeftArrow={<CustomLeftArrow />}
  customRightArrow={<CustomRightArrow />}
>

        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
