import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FilmsContext } from "../contexts/FilmsContext";
import Tag from "./Tag";
import { BsFillRocketTakeoffFill } from "react-icons/bs";

const Starship = () => {
  const { id } = useParams();
  const { films, ids, getIds } = useContext(FilmsContext);
  const [starshipObject, setStarshipObject] = useState({});
  const [idsObject, setIdsObject] = useState({});
  const { data, pilots, films: starshipFilms } = starshipObject;

  // fetch starship data
  useEffect(() => {
    const fetchStarship = async () => {
      const response = await fetch(`https://swapi.dev/api/starships/${id}`);
      const data = await response.json();
      console.log(data);
      setStarshipObject({ data });
    };
    fetchStarship();
  }, []);

  // filter films
  useEffect(() => {
    if (data && films) {
      const ids = data.films.map((film) => {
        return parseInt(film.match(/\/(\d+)\/$/)[1]);
      });
      const filteredFilms = films.filter((film) => {
        return ids.includes(film.episode_id);
      });
      setStarshipObject((prevValues) => {
        return {
          ...prevValues,
          films: filteredFilms,
        };
      });
    }
  }, [data, films]);

  // fetch pilots
  useEffect(() => {
    const fetchPilotsData = async () => {
      if (data) {
        try {
          const responses = await Promise.all(
            data.pilots.map(async (source) => {
              const response = await fetch(source);
              return response.json();
            })
          );
          setStarshipObject((prevValues) => {
            return {
              ...prevValues,
              pilots: responses,
            };
          });
        } catch (error) {
          console.error("Error fetching people data:", error);
        }
      }
    };
    fetchPilotsData();
  }, [data]);

  // get ids
  useEffect(() => {
    if (data) {
      const filmsIds = data.films ? getIds(data.films) : [];
      const pilotsIds = data.pilots ? getIds(data.pilots) : [];
      setIdsObject((prevValues) => {
        return {
          ...prevValues,
          filmsIds: filmsIds,
          pilotsIds: pilotsIds,
        };
      });
    }
  }, [data]);

  return (
    <div className="flex flex-col w-full px-10 h-fit py-10">
      {data && (
        <div className="font-light flex flex-col gap-4">
          <h1 className="text-xl font-normal border-b pb-1 flex items-center">
            <BsFillRocketTakeoffFill className="w-12 h-12" />
            &nbsp; Starship #{id} - {data.name}
          </h1>
          <div className="mt-5">
            <span className="font-normal">Model:</span> {data.model}
          </div>
          <div>
            <span className="font-normal">Manufacturer:</span>{" "}
            {data.manufacturer}
          </div>
          <div>
            <span className="font-normal">Cost in credits:</span>{" "}
            {data.cost_in_credits}
          </div>
          <div>
            <span className="font-normal">Length:</span> {data.length}
          </div>
          <div>
            <span className="font-normal">Max atmosphering speed:</span>{" "}
            {data.max_atmosphering_speed}
          </div>
          <div>
            <span className="font-normal">Crew:</span> {data.crew}
          </div>
          <div>
            <span className="font-normal">Passengers:</span> {data.passengers}
          </div>
          <div>
            <span className="font-normal">Cargo capacity:</span>{" "}
            {data.cargo_capacity}
          </div>
          <div>
            <span className="font-normal">Consumables:</span> {data.consumables}
          </div>
          <div>
            <span className="font-normal">Hyperdrive rating:</span>{" "}
            {data.hyperdrive_rating}
          </div>
          <div>
            <span className="font-normal">MGLT:</span> {data.MGLT}
          </div>
          <div>
            <span className="font-normal">Starship class:</span>{" "}
            {data.starship_class}
          </div>
          <div>
            <span className="font-normal">Pilots:</span>{" "}
            {pilots &&
              idsObject.pilotsIds &&
              pilots.map((pilot, index) => {
                return (
                  <Tag
                    link={`/people/${idsObject.pilotsIds[index]}`}
                    element={pilot.name}
                  />
                );
              })}
          </div>
          <div>
            <span className="font-normal">Films:</span>{" "}
            {starshipFilms &&
              idsObject.filmsIds &&
              starshipFilms.map((film, index) => {
                return (
                  <Tag
                    link={`/films/film/${idsObject.pilotsIds[index]}`}
                    element={film.title}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Starship;
