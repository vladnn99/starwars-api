import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FilmsContext } from "../contexts/FilmsContext";
import Tag from "./Tag";
import { BsFillPersonLinesFill } from "react-icons/bs";

const Species = () => {
  const { id } = useParams();
  const { films, ids, getIds } = useContext(FilmsContext);
  const [speciesObject, setSpeciesObject] = useState({});
  const [idsObject, setIdsObject] = useState({});
  const { data, planet, people, films: speciesFilms } = speciesObject;

  // fetch species data
  useEffect(() => {
    const fetchSpecies = async () => {
      const response = await fetch(`https://swapi.dev/api/species/${id}`);
      const data = await response.json();
      console.log(data);
      setSpeciesObject({ data });
    };
    fetchSpecies();
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
      setSpeciesObject((prevValues) => {
        return {
          ...prevValues,
          films: filteredFilms,
        };
      });
    }
  }, [data, films]);

  // fetch people
  useEffect(() => {
    const fetchPeopleData = async () => {
      if (data) {
        try {
          const responses = await Promise.all(
            data.people.map(async (source) => {
              const response = await fetch(source);
              return response.json();
            })
          );
          setSpeciesObject((prevValues) => {
            return {
              ...prevValues,
              people: responses,
            };
          });
        } catch (error) {
          console.error("Error fetching people data:", error);
        }
      }
    };
    fetchPeopleData();
  }, [data]);

  // fetch planet
  useEffect(() => {
    const fetchSpeciesPlanet = async () => {
      if (data) {
        try {
          const response = await fetch(data.homeworld);
          const planetData = await response.json();
          setSpeciesObject((prevValues) => {
            return {
              ...prevValues,
              planet: planetData,
            };
          });
        } catch (error) {
          console.error("Error fetching planets data:", error);
        }
      }
    };
    fetchSpeciesPlanet();
  }, [data]);

  // get ids
  useEffect(() => {
    if (data) {
      const peopleIds = data.people ? getIds(data.people) : [];
      const filmsIds = data.films ? getIds(data.films) : [];
      const planetId = data.homeworld ? getIds([data.homeworld]) : [];
      setIdsObject((prevValues) => {
        return {
          ...prevValues,
          filmsIds: filmsIds,
          peopleIds: peopleIds,
          planetId: planetId,
        };
      });
    }
  }, [data]);

  return (
    <div className="flex flex-col w-full px-10 h-fit py-10">
      {data && (
        <div className="font-light flex flex-col gap-4">
          <h1 className="text-xl font-normal border-b pb-1 flex items-center">
            <BsFillPersonLinesFill className="w-12 h-12" />
            &nbsp; Species #{id} - {data.name}
          </h1>
          <div className="mt-5">
            <span className="font-normal">Species classification:</span>{" "}
            {data.classification}
          </div>
          <div>
            <span className="font-normal">Species designation:</span>{" "}
            {data.designation}
          </div>
          <div>
            <span className="font-normal">Species average height:</span>{" "}
            {data.average_height}
          </div>
          <div>
            <span className="font-normal">Species skin colors:</span>{" "}
            {data.skin_colors}
          </div>
          <div>
            <span className="font-normal">Species hair colors:</span>{" "}
            {data.hair_colors}
          </div>
          <div>
            <span className="font-normal">Species eye colors:</span>{" "}
            {data.eye_colors}
          </div>
          <div>
            <span className="font-normal">Species average lifespan:</span>{" "}
            {data.average_lifespan}
          </div>
          <div>
            <span className="font-normal">Species homeworld:</span>{" "}
            {planet &&
              idsObject.planetId &&
              [planet].map((planetElement, index) => {
                return (
                  <Tag
                    link={`/planets/${idsObject.planetId[index]}`}
                    element={planetElement.name}
                  />
                );
              })}
          </div>
          <div>
            <span className="font-normal">Species language:</span>{" "}
            {data.language}
          </div>
          <div>
            {/* de verificat ce e gresit aici */}
            <span className="font-normal">Species films:</span>{" "}
            {speciesFilms &&
              idsObject.filmsIds &&
              speciesFilms.map((film, index) => {
                return (
                  <Tag
                    link={`/films/film/${idsObject.filmsIds[index]}`}
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

export default Species;
