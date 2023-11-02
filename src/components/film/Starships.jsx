import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tag from "../Tag";
import { FilmsContext } from "../../contexts/FilmsContext";

const Starships = (props) => {
  const { film } = props;
  const { getIds } = useContext(FilmsContext);
  const [starshipsData, setStarshipsData] = useState([]);
  const [starshipsIds, setStarshipsIds] = useState([]);
  useEffect(() => {
    // Fetch starships data
    const fetchStarshipsData = async () => {
      if (film && film.starships) {
        try {
          const responses = await Promise.all(
            film.starships.map(async (source) => {
              const response = await fetch(source);
              return response.json();
            })
          );
          // Now 'responses' is an array of starships data
          setStarshipsData(responses);
        } catch (error) {
          console.error("Error fetching starships data:", error);
        }
      }
    };
    fetchStarshipsData();
  }, [film]);

  useEffect(() => {
    if (film) {
      const ids = getIds(film.starships);
      setStarshipsIds(ids);
    }
  }, [film]);

  return (
    <div className="mt-10 self-start border-b pb-5">
      <h2 className="text-lg">Starships</h2>
      <div className="flex flex-wrap">
        {(!starshipsData || starshipsData.length === 0) && (
          <div>
            <p>Starships Loading...</p>
          </div>
        )}
        {(starshipsData || starshipsData.length !== 0) &&
          starshipsData.map((starship, index) => {
            return (
              <Link
                key={starshipsIds[index]}
                to={`/starships/${starshipsIds[index]}`}
                className="bg-gray-700 my-1 mx-1 px-5 py-1 rounded-md"
              >
                {starship.name}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Starships;
