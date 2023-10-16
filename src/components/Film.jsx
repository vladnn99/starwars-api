import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FilmsContext } from "../contexts/FilmsContext";

const Film = () => {
  const { id } = useParams();
  const { films } = useContext(FilmsContext);
  const [characters2, setCharacters2] = useState([]);

  const film = films.find((item) => {
    return item.episode_id === parseInt(id);
  });

  //   destructure film
  const {
    title,
    episode_id,
    opening_crawl,
    director,
    producer,
    image,
    characters,
  } = film;
  const characterIds = [];
  characters.map((character) => {
    characterIds.push(parseInt(character.match(/\/(\d+)\/$/)[1]));
  });

  const fetchCharacters = async (id) => {
    const response = await fetch(`https://swapi.dev/api/people/${id}`);
    const characterData = await response.json();
    return characterData;
  };

  useEffect(() => {
    const fetchData = async () => {
      const characterDataArray = await Promise.all(
        characterIds.map((id) => fetchCharacters(id))
      );
      setCharacters2(characterDataArray);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center w-full px-10">
      <h1 className="text-xl font-semibold">
        Episode {episode_id}: {title}
      </h1>
      <div className="flex mt-5 pb-5 max-w-2xl">
        <div className="flex-1">
          {/* poster */}
          <img className="object-cover" src={image} alt="" />
        </div>
        <div className="flex flex-col flex-1 px-5">
          {/* film details */}
          <p className="text-md leading-tight">Director: {director}</p>
          <p className="text-md leading-tight">Producer: {producer}</p>
          <p className="font-semibold mt-8">Opening Crawl</p>
          <p className="font-light"> {opening_crawl}</p>
        </div>
        {/* characters */}
      </div>
      <div className="border-b w-full"></div>
      <div className="mt-10 self-start">
        <h2 className="text-lg">Characters</h2>
        <div className="flex flex-wrap">
          {characters2.map((character) => {
            return (
              <p className="bg-gray-700 my-1 mx-1 px-5 py-1 rounded-md">
                {character.name}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Film;
