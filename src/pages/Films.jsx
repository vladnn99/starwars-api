import React, { useContext } from "react";
// import films context
import { FilmsContext } from "../contexts/FilmsContext";
// import film
import FilmCover from "../components/FilmCover";
import { Link } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";

const Films = () => {
  // get the films from the film context
  const { films } = useContext(FilmsContext);
  console.log(films);
  return (
    <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <Link to={"/"} className="absolute text-white text-xl top-5 right-5 z-10">
        <IoCloseCircleOutline className="text-5xl transition-all duration-300 hover:rotate-90 ease-in" />
      </Link>
      {films.map((film) => {
        return <FilmCover film={film} />;
      })}
    </div>
  );
};

export default Films;
