import React, { useState, useEffect } from "react";
import FoodItem from "./FoodItem";

const SearchBar = ({ recipes }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Debounce mechanism
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filtering suggestions
  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setSuggestions(filtered);
    }
  }, [debouncedSearchTerm, recipes]);

  // Handle suggestion click (Clears input after click)
  const handleSuggestionClick = (foodItem) => {
    setSelectedFood(foodItem); // Set selected food
    setSearchTerm(""); // Clear search input
    setSuggestions([]); // Hide suggestions list
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      handleSuggestionClick(suggestions[highlightedIndex]);
    }
  };

  return (
    <div className="container mx-auto p-5">
      {/* Search Input */}
      <div className="relative flex justify-center my-5">
        <input
          type="search"
          placeholder="Search Your Favourite Food Item..."
          className="px-4 py-2 w-full md:w-1/2 rounded-full border-2 border-orange-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Loading Indicator */}
      {/* {loading && <p className="text-center text-orange-500">Loading...</p>} */}

      {/* Suggestions */}
      {suggestions.length > 0 && !loading && (
        <ul className="absolute bg-white border border-gray-300 w-1/2 left-1/4 mt-1 rounded-lg shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                index === highlightedIndex ? "bg-gray-200" : ""
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}

      {/* No Food Found */}
      {searchTerm.trim() !== "" &&
        suggestions.length === 0 &&
        !selectedFood &&
        !loading && (
          <p className="text-center text-red-500 font-semibold mt-2">
            No Food Found
          </p>
        )}

      {/* Selected Food Details */}
      {selectedFood && <FoodItem selectedFood={selectedFood} />}
    </div>
  );
};

export default SearchBar;
