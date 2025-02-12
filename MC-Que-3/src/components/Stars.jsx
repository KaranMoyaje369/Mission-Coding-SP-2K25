import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Stars = ({ totalStars = 5 }) => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [hoveredStars, setHoveredStars] = useState(0);

  return (
    <>
      <div className="p-10 shadow-lg">
        <h2 className="text-xl md:text-3xl text-center font-bold mb-5 text-gray-600">
          Rate Now
        </h2>
        <div className="flex justify-center space-x-2">
          {[...Array(totalStars)].map((_, index) => {
            const starValue = index + 1; // Star values from 1 to totalStars

            return (
              <FaStar
                key={index}
                className={`text-2xl md:text-3xl cursor-pointer transition-colors duration-200 ${
                  starValue <= (hoveredStars || selectedStars)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                onClick={() => setSelectedStars(starValue)}
                onMouseEnter={() => setHoveredStars(starValue)}
                onMouseLeave={() => setHoveredStars(0)} // Reset hover effect when the mouse leaves
              />
            );
          })}
        </div>
        <div className="flex justify-center items-center font-bold min-w-[250px] text-xl md:text-2xl mt-4">
          <h2 className="text-gray-500">
            {" "}
            Rating : {`${selectedStars} / ${totalStars}`}
          </h2>
          <FaStar className="text-2xl md:text-3xl text-yellow-400 ml-2" />
        </div>
      </div>
    </>
  );
};

export default Stars;
