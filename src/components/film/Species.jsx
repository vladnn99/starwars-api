import React, { useContext, useState, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FilmsContext } from "../../contexts/FilmsContext";
import Tag from "../Tag";

const Species = (props) => {
  const { film } = props;
  const { getIds } = useContext(FilmsContext);
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
    if (film) {
      const ids = getIds(film.species);
      setSpeciesIds(ids);
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
              <Tag
                key={speciesIds[index]}
                link={`/species/${speciesIds[index]}`}
                element={species.name}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Species;
