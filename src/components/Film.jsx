import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FilmsContext } from "../contexts/FilmsContext";
import { Link } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import Characters from "./film/Characters";
import Planets from "./film/Planets";
import Vehicles from "./film/Vehicles";
import Species from "./film/Species";
import Starships from "./film/Starships";

const Film = () => {
  const { id } = useParams();
  const { films, setFilms } = useContext(FilmsContext);
  const [film, setFilm] = useState({});

  useEffect(() => {
    setFilm(films[id - 1]);
  }, [films, film, id]);

  if (!films || films.length === 0) {
    return <div>Loading film...</div>;
  }
  console.log(films);
  return (
    <div className="flex flex-col items-center w-full px-10">
      {/* <div>{film && film.title}</div> */}
      {/* {film && setChar()} */}
      {film && (
        <div>
          <Link
            to={"/films"}
            className="absolute text-white text-xl top-5 right-5 z-10"
          >
            <IoCloseCircleOutline className="text-5xl transition-all duration-300 hover:rotate-90 ease-in" />
          </Link>
          <h1 className="text-xl font-semibold">
            Episode {film.episode_id}: {film.title}
          </h1>
          <div className="flex mt-5 pb-5 border-b">
            <div className="flex-1 max-w-xs">
              {/* poster */}
              <img className="object-cover" src={film.image} alt="" />
            </div>
            <div className="flex flex-col flex-1 px-5 max-w-xs">
              {/* film details */}
              <p className="text-md leading-tight">Director: {film.director}</p>
              <p className="text-md leading-tight">Producer: {film.producer}</p>
              <p className="font-semibold mt-8">Opening Crawl</p>
              <p className="font-light"> {film.opening_crawl}</p>
            </div>
            {/* characters */}
          </div>
          <Characters film={film} id={id} />
          <Planets film={film} id={id} />
          <Species film={film} id={id} />
          <Starships film={film} id={id} />
          <Vehicles film={film} id={id} />
        </div>
      )}
    </div>
  );
};

export default Film;
