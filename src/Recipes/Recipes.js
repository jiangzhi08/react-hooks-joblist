import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";
import styles from "./Recipes.module.css";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/postsActions";
import loaderimg from "../images/loader.gif";

const Recipes = ({ match, dispatch, loading, recipes, hasErrors }) => {
  const { cuisineType } = match.params;

  const APP_ID = "0baa6c40";
  const APP_KEY = "0621f495b0d528f39b4eeb23bd38959c";
  // const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(cuisineType);

  useEffect(() => {
    const BASE_URL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    dispatch(fetchPosts(BASE_URL));
  }, [dispatch, query]);

  // useEffect(() => {
  //   const getRecipes = async () => {
  //     const exampleRequest = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  //     const response = await fetch(exampleRequest);
  //     const data = await response.json();
  //     setRecipes(data.hits);
  //   };

  //   console.log(query);
  //   getRecipes();
  // }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  const renderPosts = () => {
    if (loading) return <img src={loaderimg} alt="Loading" width="100" />;
    if (hasErrors) return <p>Too many requests. Refresh later please </p>;

    // return posts.map((post) => <h1 key={post.id}>{post.title} </h1>);
    if (recipes)
      return (
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
      );
  };

  return (
    <div className={styles.recipes_app}>
      <h1 className={styles.title}>Recipes</h1>
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

      {/* <h3>
        {recipes.length === 0 ? (
          <Alert variant="warning">
            Can not find or too many requests. Please wait a moment to refresh.
          </Alert>
        ) : null}
      </h3> */}

      <section>{renderPosts()}</section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.posts.loading,
  recipes: state.posts.posts.hits,
  hasErrors: state.posts.hasErrors,
});

// Connect Redux to React
export default connect(mapStateToProps)(Recipes);
