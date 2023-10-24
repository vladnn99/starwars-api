import React, { useState, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Characters = (props) => {
  const { film } = props;
  const [charactersData, setCharactersData] = useState([]);
  const [charactersIds, setCharactersIds] = useState([]);
  useEffect(() => {
    // Fetch characters data
    const fetchCharactersData = async () => {
      if (film && film.characters) {
        try {
          const responses = await Promise.all(
            film.characters.map(async (source) => {
              const response = await fetch(source);
              return response.json();
            })
          );
          // Now 'responses' is an array of character data
          setCharactersData(responses);
        } catch (error) {
          console.error("Error fetching characters data:", error);
        }
      }
    };
    fetchCharactersData();
  }, [film]);

  useEffect(() => {
    if (film && film.characters) {
      try {
        const ids = film.characters.map((character) => {
          return parseInt(character.match(/\/(\d+)\/$/)[1]);
        });
        setCharactersIds(ids);
      } catch (error) {
        console.error("Error getting films ID's", error);
      }
    }
  }, [film]);

  return (
    <div className="mt-10 self-start border-b pb-5">
      <h2 className="text-lg">Characters</h2>
      <div className="flex flex-wrap">
        {(!charactersData || charactersData.length === 0) && (
          <div>
            <p>Characters Loading...</p>
          </div>
        )}
        {(charactersData || charactersData.length !== 0) &&
          charactersData.map((character, index) => {
            return (
              <Link
                key={charactersIds[index]}
                to={`/people/${charactersIds[index]}`}
                className="bg-gray-700 my-1 mx-1 px-5 py-1 rounded-md"
              >
                {character.name}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Characters;
