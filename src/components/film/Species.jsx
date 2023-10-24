import React, { useState, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Species = (props) => {
  const { film } = props;
  const [speciesData, setSpeciesData] = useState([]);
  const [speciesIds, setSpeciesIds] = useState([]);
  useEffect(() => {
    // fetch species data
    const fetchSpeciesData = async () => {
      if (film && film.species) {
        try {
          const responses = await Promise.all(
            film.species.map(async (source) => {
              const response = await fetch(source);
              return response.json();
            })
          );
          setSpeciesData(responses);
        } catch (error) {
          console.error("Error fetching species data", error);
        }
      }
    };
    fetchSpeciesData();
  }, [film]);

  useEffect(() => {
    if (film && film.species) {
      try {
        const ids = film.species.map((species) => {
          return parseInt(species.match(/\/(\d+)\/$/)[1]);
        });
        setSpeciesIds(ids);
      } catch (error) {
        console.error("Error getting species ID's", error);
      }
    }
  }, [film]);
  return (
    <div className="mt-10 self-start border-b pb-5">
      <h2 className="text-lg">Species</h2>
      <div className="flex flex-wrap">
        {(!speciesData || speciesData.length === 0) && (
          <div>
            <p>Species Loading...</p>
          </div>
        )}
        {(speciesData || speciesData.length !== 0) &&
          speciesData.map((species, index) => {
            return (
              <Link
                key={speciesIds[index]}
                to={`/species/${speciesIds[index]}`}
                className="bg-gray-700 my-1 mx-1 px-5 py-1 rounded-md"
              >
                {species.name}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Species;
