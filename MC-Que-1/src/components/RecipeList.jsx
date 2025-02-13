import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null); // ✅ Define error state

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("https://dummyjson.com/recipes");
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching recipes:", err); // ✅ Log error
      }
    };

    fetchRecipes();
  }, []);

  return (
    <>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}{" "}
      {/* ✅ Show error if any */}
      <SearchBar recipes={recipes} />
    </>
  );
};

export default RecipeList;
