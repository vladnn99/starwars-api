import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FilmsContext } from "../contexts/FilmsContext";
import { BiSolidPlanet } from "react-icons/bi";

const Planet = () => {
  const { films } = useContext(FilmsContext);
  const { id } = useParams();
  const [planet, setPlanet] = useState();
  const [planetFilms, setPlanetFilms] = useState([]);
  const [planetResidents, setPlanetResidents] = useState([]);
  const [residentIds, setResidentIds] = useState([]);

  // fetch planet data
  useEffect(() => {
    const fetchPlanet = async () => {
      const response = await fetch(`https://swapi.dev/api/planets/${id}`);
      const data = await response.json();
      setPlanet(data);
    };
    fetchPlanet();
  }, []);

  useEffect(() => {
    // fetch residents data
    const fetchResidentsData = async () => {
      if (planet && films) {
        try {
          const responses = await Promise.all(
            planet.residents.map(async (source) => {
              const response = await fetch(source);
              return response.json();
            })
          );
          setPlanetResidents(responses);
        } catch (error) {
          console.error("Error fetching residents data", error);
        }
      }
    };
    fetchResidentsData();
  }, [planet, films]);

  useEffect(() => {
    if (planet && films) {
      const ids = planet.films.map((film) => {
        return parseInt(film.match(/\/(\d+)\/$/)[1]);
      });
      const filteredFilms = films.filter((film) => {
        return ids.includes(film.episode_id);
      });
      setPlanetFilms(filteredFilms);
    }
  }, [planet, films]);

  useEffect(() => {
    if (planetResidents) {
      const ids = planetResidents.map((resident) => {
        return parseInt(resident.url.match(/\/(\d+)\/$/)[1]);
      });
      setResidentIds(ids);
    }
  }, [planetResidents]);

  return (
    <div className="flex flex-col w-full px-10 h-fit py-10">
      {planet && (
        <div className="font-light flex flex-col gap-2">
          <h1 className="text-xl font-normal border-b pb-1 flex items-center">
            <BiSolidPlanet className="w-12 h-12" />
            &nbsp; Planet #{id} ({planet.name})
          </h1>
          <div className="mt-5">
            <span className="font-normal">Planet climate:</span>{" "}
            {planet.climate}
          </div>
          <div>
            <span className="font-normal">Planet diameter:</span>{" "}
            {(+planet.diameter).toLocaleString("en-us")}
          </div>
          <div className="flex items-center">
            <span className="font-normal">Planet films: </span>
            {(!planetFilms || planetFilms.length === 0) && (
              <div>Films Loading...</div>
            )}
            <div className="flex gap-1 flex-wrap">
              {planetFilms.map((film) => {
                return (
                  <Link
                    to={`/films/film/${film.episode_id}`}
                    className="bg-gray-700 my-1 mx-1 px-5 py-1 rounded-md"
                  >
                    {film.title}
                  </Link>
                );
              })}
            </div>
          </div>
          <div>
            <span className="font-normal">Planet gravity:</span>{" "}
            {planet.gravity}
          </div>
          <div>
            <span className="font-normal">Planet orbital period:</span>{" "}
            {planet.orbital_period}
          </div>
          <div>
            <span className="font-normal">Planet population:</span>{" "}
            {`${
              planet.population !== "unknown"
                ? (+planet.population).toLocaleString("en-us")
                : planet.population
            }`}
          </div>
          <div className="flex gap-1 items-center">
            <span className="font-normal">Planet residents:</span>{" "}
            {(!planetResidents || planetResidents.length === 0) && (
              <div>Planet Residents Loading...</div>
            )}
            <div className="flex gap-1 flex-wrap">
              {planetResidents.map((resident, index) => {
                return (
                  <Link
                    to={`/people/${residentIds[index]}`}
                    className="bg-gray-700 my-1 mx-1 px-5 py-1 rounded-md"
                  >
                    {resident.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div>
            <span className="font-normal">Planet rotation period: </span>{" "}
            {planet.rotation_period}
          </div>
          <div>
            <span className="font-normal">Planet surface water:</span>{" "}
            {planet.surface_water}
          </div>
          <div>
            <span className="font-normal">Planet terrain:</span>{" "}
            {planet.terrain}
          </div>
        </div>
      )}
    </div>
  );
};

export default Planet;
