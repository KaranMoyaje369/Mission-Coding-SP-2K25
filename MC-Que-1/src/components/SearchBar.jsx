import React, { useState, useEffect } from "react";
import FoodItem from "./FoodItem";

const SearchBar = ({ recipes }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);

  // Debounce mechanism
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filtering suggestions
  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(debouncedSearchTerm)
      );
      setSuggestions(filtered);
    }
  }, [debouncedSearchTerm, recipes]);

  // Handle suggestion click
  const handleSuggestionClick = (foodItem) => {
    setSearchTerm(foodItem.name);
    setSuggestions([]);
    setSelectedFood(foodItem);
  };

  return (
    <div className="container mx-auto p-5">
      {/* Search Input */}
      <div className="relative container mx-auto flex justify-center my-5">
        <input
          type="search"
          placeholder="Search Your Favourite Food Item..."
          className="px-4 py-2 w-full md:w-1/2 rounded-full border-2 border-orange-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 w-1/2 left-1/4 mt-1 rounded-lg shadow-lg">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
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
        !selectedFood && (
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
