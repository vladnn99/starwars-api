import React, { useContext } from "react";
// import films context
import { FilmsContext } from "../contexts/FilmsContext";
// import film
import FilmCover from "../components/film/FilmCover";
import { Link } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";

const Films = () => {
  // get the films from the film context
  const { films } = useContext(FilmsContext);
  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-2xl w-full bg-gray-700 items-center justify-center flex py-3">
        Films
      </div>
      <div
        className={`${
          !films || films.length === 0
            ? "flex items-center justify-center"
            : "grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
        }`}
      >
        {/* <Link
          to={"/"}
          className="absolute text-white text-xl top-5 right-5 z-10"
        >
          <IoCloseCircleOutline className="text-5xl transition-all duration-300 hover:rotate-90 ease-in" />
        </Link> */}
        {films &&
          films.map((film, id) => {
            return (
              <Link to={`/films/film/${id + 1}`}>
                <FilmCover film={film} />
              </Link>
            );
          })}
        {(!films || films.length === 0) && (
          <div className="flex items-center justify-center">
            <p>Loading films...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Films;
