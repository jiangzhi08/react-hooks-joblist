import React from "react";
import style from "./Movie.module.css";

export default function Movie({
  poster_path,
  title,
  movieDetailClicked,
  movieid,
}) {
  return (
    <div className={style.movie} onClick={() => movieDetailClicked(movieid)}>
      <img className={style.image} src={poster_path} alt="" />
      <p className={style.title}>{title}</p>
    </div>
  );
}
