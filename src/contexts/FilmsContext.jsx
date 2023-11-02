import React, { createContext, useState, useEffect } from "react";
import img1 from "../img/ep-1-the-phantom-menace.jpg";
import img2 from "../img/ep-2-attack-of-the-clones.jpg";
import img3 from "../img/ep-3-revenge-of-the-sith.jpg";
import img4 from "../img/ep-4-a-new-hope.jpg";
import img5 from "../img/ep-5-the-empire-strikes-back.jpg";
import img6 from "../img/ep-6-return-of-the-jedi.jpg";

// create context
export const FilmsContext = createContext();

const FilmsProvider = ({ children }) => {
  // films state
  const [films, setFilms] = useState([]);
  const [posters, setPosters] = useState([img1, img2, img3, img4, img5, img6]);
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch("https://swapi.dev/api/films/");
      const data = await response.json();
      setFilms(data.results.sort((a, b) => a.episode_id - b.episode_id));
      setFilms((prevFilms) =>
        prevFilms.map((film, index) => ({
          ...film,
          image: posters[index],
        }))
      );
    };
    fetchMovies();
  }, []);

  const getIds = (array) => {
    return array
      ? array.map((element) => parseInt(element.match(/\/(\d+)\/$/)[1]))
      : [];
  };

  return (
    <FilmsContext.Provider value={{ films, setFilms, getIds }}>
      {children}
    </FilmsContext.Provider>
  );
};

export default FilmsProvider;
