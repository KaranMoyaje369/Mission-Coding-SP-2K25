import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import icons
import "./ImageCarousel.css";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSlidePaused, setIsAutoSlidePaused] = useState(false);

  // Function to handle next image
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setIsAutoSlidePaused(true); // Pause auto-slide on user interaction
  };

  // Function to handle previous image
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setIsAutoSlidePaused(true); // Pause auto-slide on user interaction
  };

  // Function to handle dot click
  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setIsAutoSlidePaused(true); // Pause auto-slide on user interaction
  };

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoSlidePaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isAutoSlidePaused, images.length]);

  // Reset auto-slide pause after user interaction
  useEffect(() => {
    if (isAutoSlidePaused) {
      const timeout = setTimeout(() => setIsAutoSlidePaused(false), 5000); // Resume after 5 seconds
      return () => clearTimeout(timeout);
    }
  }, [isAutoSlidePaused]);

  return (
    <div className="carousel">
      {/* Image Display */}
      <div className="carousel-image-container">
        <img
          src={images[currentIndex]}
          alt={`carousel-image-${currentIndex}`}
          className="carousel-image"
        />

        {/* Navigation Icons */}
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="carousel-button prev-button"
        >
          <FaChevronLeft /> {/* Previous Icon */}
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === images.length - 1}
          className="carousel-button next-button"
        >
          <FaChevronRight /> {/* Next Icon */}
        </button>
      </div>

      {/* Dot Indicators. */}
      <div className="dot-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => handleDotClick(index)}
            className={`dot ${index === currentIndex ? "active" : ""}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
