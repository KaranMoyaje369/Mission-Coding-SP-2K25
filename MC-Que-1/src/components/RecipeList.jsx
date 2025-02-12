import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setTimeout(async () => {
          const response = await fetch("https://dummyjson.com/recipes");
          if (!response.ok) {
            throw new Error("Failed to fetch recipes");
          }
          const data = await response.json();
          setRecipes(data.recipes);
        }, 500); // Delay of 500ms
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRecipes();
  }, []);

  // console.log("Data:", recipes);

  return (
    <>
      <SearchBar recipes={recipes} />
    </>
  );
};

export default RecipeList;
