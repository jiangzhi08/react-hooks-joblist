import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";
import styles from "./Recipes.module.css";

export default function Recipes({ cuisineType }) {
  const APP_ID = "0baa6c40";
  const APP_KEY = "0621f495b0d528f39b4eeb23bd38959c";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(cuisineType);
  // let errormsg = "";

  // const exampleRequest = "https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free"

  useEffect(() => {
    const getRecipes = async () => {
      const exampleRequest = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
      const response = await fetch(exampleRequest);
      const data = await response.json();
      setRecipes(data.hits);

      // await fetch(exampleRequest)
      //   .then(async (response) => {
      //     const data = await response.json();
      //     console.log(data);
      //     setRecipes(data.hits);
      //   })
      //   .catch((error) => {
      //     errormsg = error;
      //   });
    };

    console.log(query);
    getRecipes();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <div className={styles.recipes_app}>
      <h1 className={styles.title}> Recipes</h1>
      <form className={styles.search_form} onSubmit={getSearch}>
        <input
          className={styles.search_bar}
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className={styles.search_button} type="submit">
          Search
        </button>
      </form>

      <h3>
        {recipes.length === 0
          ? "Too many requests.  Please wait a moment to refresh."
          : ""}
      </h3>

      <div className={styles.recipes}>
        {recipes.map((item) => (
          <Recipe
            key={item.recipe.label}
            title={item.recipe.label}
            calories={item.recipe.calories}
            image={item.recipe.image}
            ingredients={item.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}
