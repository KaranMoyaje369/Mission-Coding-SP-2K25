import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("https://dummyjson.com/recipes");
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setRecipes(data.recipes);
        setSearchResults(data.recipes); // Set initial search results to all recipes
      } catch (err) {
        setError(err.message);
        console.error("Error fetching recipes:", err);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setSearchResults(recipes); // Reset search results to all recipes when input is cleared
    } else {
      const filteredResults = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  return (
    <>
      <SearchBar
        recipes={recipes}
        handleSearch={handleSearch}
        searchResults={searchResults}
      />

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* No results message */}
      {searchResults.length === 0 && (
        <p className="text-center text-red-500 font-semibold mt-2">
          No Food Found
        </p>
      )}
    </>
  );
};

export default RecipeList;
