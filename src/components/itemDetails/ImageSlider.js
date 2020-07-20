import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Slide } from "react-slideshow-image";

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  autoplay: false,
  pauseOnHover: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  },
};

const uri = "https://picsum.photos/200";

const ImageSlider = ({ url }) => {
  return (
    <div className="slide-container">
      <Slide {...properties}>
        {url.map((val) => {
          return (
            <div className="each-slide">
              <div style={{ backgroundImage: `url(${val})` }} />
            </div>
          );
        })}
      </Slide>
    </div>
  );
};

export default ImageSlider;
