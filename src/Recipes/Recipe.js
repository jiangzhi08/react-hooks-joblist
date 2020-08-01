import React from "react";
import style from "./recipe.module.css";

export default function Recipe({ title, calories, image, ingredients }) {
  return (
    <div className={style.recipe}>
      <h2>{title}</h2>
      <ol>
        {ingredients.map((item, index) => (
          <li key={index}>{item.text}</li>
        ))}
      </ol>
      <p>Calrories: {Math.round(calories)}</p>
      <img className={style.image} src={image} alt="" />
    </div>
  );
}
