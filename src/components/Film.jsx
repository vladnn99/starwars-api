import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FilmsContext } from "../contexts/FilmsContext";
import { Link } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";

const Film = () => {
  const { id } = useParams();
  const { films, setFilms } = useContext(FilmsContext);
  const [charactersData, setCharactersData] = useState([]);
  const [characterIds, setCharacterIds] = useState([]);
  const [film, setFilm] = useState({});

  // const film = films.find((item) => {
  //   return item.episode_id === parseInt(id);
  // });

  useEffect(() => {
    setFilm(films[id - 1]);
    if (film && film.characters) {
      setCharacterIds(film.characters);
    }
  }, [films, film, id]);

  useEffect(() => {
    // Fetch character data
    const fetchCharacterData = async () => {
      if (film && film.characters) {
        try {
          const characterIds = film.characters.map((character) => {
            return parseInt(character.match(/\/(\d+)\/$/)[1]);
          });
          setCharacterIds(characterIds);
        } catch (error) {
          console.error("Error fetching character data:", error);
        }
      }
    };

    fetchCharacterData();
  }, [film]);

  useEffect(() => {
    const fetchCharacters = async () => {
      if (characterIds) {
        const responses = await Promise.all(
          characterIds.map(async (id) => {
            const response = await fetch(`https://swapi.dev/api/people/${id}`);
            return response.json();
          })
        );
        // Now 'responses' is an array of character data
        console.log(responses);
        setCharactersData(responses);
      }
    };
    fetchCharacters();
  }, [characterIds, id]);

  useEffect(() => {
    const consoleShow = async () => {
      console.log(characterIds);
    };
    consoleShow();
  }, [film, characterIds]);

  if (!films || films.length === 0) {
    return <div>Loading film...</div>;
  }

  // const fetchCharacters = async (id) => {
  //   const response = await fetch(`https://swapi.dev/api/people/${id}`);
  //   const characterData = await response.json();
  //   return characterData;
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const characterDataArray = await Promise.all(
  //       characterIds.map((id) => fetchCharacters(id))
  //     );
  //     setCharacters2(characterDataArray);
  //   };
  //   fetchData();
  //   console.log(characterIds);
  //   console.log(characters2);
  // }, []);

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
            {/* Episode {film.episode_id}: {film.title} */}
          </h1>
          <div className="flex mt-5 pb-5 max-w-2xl">
            <div className="flex-1">
              {/* poster */}
              <img className="object-cover" src={film.image} alt="" />
            </div>
            <div className="flex flex-col flex-1 px-5">
              {/* film details */}
              <p className="text-md leading-tight">Director: {film.director}</p>
              <p className="text-md leading-tight">Producer: {film.producer}</p>
              <p className="font-semibold mt-8">Opening Crawl</p>
              <p className="font-light"> {film.opening_crawl}</p>
            </div>
            {/* characters */}
          </div>
          <div className="border-b w-full"></div>
          <div className="mt-10 self-start">
            <h2 className="text-lg">Characters</h2>
            <div className="flex flex-wrap">
              {(!charactersData || charactersData.length === 0) && (
                <div>
                  <p>Characters Loading...</p>
                </div>
              )}
              {(charactersData || charactersData.length !== 0) &&
                charactersData.map((character, index) => {
                  // console.log(index + 1);
                  return (
                    <Link
                      to={`/people/${characterIds[index]}`}
                      className="bg-gray-700 my-1 mx-1 px-5 py-1 rounded-md"
                    >
                      {character.name}
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Film;
