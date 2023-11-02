import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FilmsContext } from "../../contexts/FilmsContext";
import Tag from "../Tag";

const Planets = (props) => {
  const { film } = props;
  const { getIds } = useContext(FilmsContext);
  const [planetsData, setPlanetsData] = useState([]);
  const [planetsIds, setPlanetsIds] = useState([]);
  useEffect(() => {
    // fetch planets data
    const fetchPlanetsData = async () => {
      if (film && film.planets) {
        try {
          const responses = await Promise.all(
            film.planets.map(async (source) => {
              const response = await fetch(source);
              return response.json();
            })
          );
          setPlanetsData(responses);
        } catch (error) {
          console.error("Error fetching planets data", error);
        }
      }
    };
    fetchPlanetsData();
  }, [film]);

  useEffect(() => {
    if (film) {
      const ids = getIds(film.planets);
      setPlanetsIds(ids);
    }
  }, [film]);
  return (
    <div className="mt-10 self-start border-b pb-5">
      <h2 className="text-lg">Planets</h2>
      <div className="flex flex-wrap">
        {(!planetsData || planetsData.length === 0) && (
          <div>
            <p>Planets Loading...</p>
          </div>
        )}
        {(planetsData || planetsData.length !== 0) &&
          planetsData.map((planet, index) => {
            return (
              <Tag
                key={planetsIds[index]}
                link={`/planets/${planetsIds[index]}`}
                element={planet.name}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Planets;
