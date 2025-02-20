import React, { useState, useEffect } from "react";
import FoodItem from "./FoodItem";

const SearchBar = ({ recipes, handleSearch, searchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle filtered suggestions based on search term
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

  // Handle suggestion click
  const handleSuggestionClick = (foodItem) => {
    setSelectedFood(foodItem);
    setSearchTerm("");
    setSuggestions([]);
  };

  // arrow key functionality on toggling dropdown receipe list
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      handleSuggestionClick(suggestions[highlightedIndex]);
    }
  };

  useEffect(() => {
    handleSearch(debouncedSearchTerm); // Call handleSearch in RecipeList when search term changes
  }, [debouncedSearchTerm, handleSearch]);

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

      {/* Suggestions */}
      {suggestions.length > 0 && (
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

      {/* Show Food Item only if there's a selected food and search results are not empty */}
      {selectedFood && searchResults.length > 0 && (
        <FoodItem selectedFood={selectedFood} />
      )}
    </div>
  );
};

export default SearchBar;
