import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";

const Planets = (props) => {
  const { film } = props;
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
    if (film && film.planets) {
      try {
        const ids = film.planets.map((planet) => {
          return parseInt(planet.match(/\/(\d+)\/$/)[1]);
        });
        setPlanetsIds(ids);
      } catch (error) {
        console.error("Error getting films ID's", error);
      }
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
              <Link
                key={planetsIds[index]}
                to={`/planets/${planetsIds[index]}`}
                className="bg-gray-700 my-1 mx-1 px-5 py-1 rounded-md"
              >
                {planet.name}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Planets;
