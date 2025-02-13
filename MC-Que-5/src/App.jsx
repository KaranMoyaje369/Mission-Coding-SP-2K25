import React from "react";
import ImageCarousel from "./components/ImageCarousel";
import Img1 from "../src/assets/image-1.jpg";
import Img2 from "../src/assets/image-2.jpg";
import Img3 from "../src/assets/image-3.jpg";

const App = () => {
  const images = [Img1, Img2, Img3];
  return (
    <>
      <ImageCarousel images={images} />
    </>
  );
};

export default App;
