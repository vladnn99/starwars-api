import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FilmsContext } from "../contexts/FilmsContext";
import { BsPersonFill } from "react-icons/bs";
import Tag from "./Tag";

// needed: species, vehicles
// done: films, planets, starships, vehicles

const Person = () => {
  const { id } = useParams();
  const { films, ids, getIds } = useContext(FilmsContext);
  const [personObject, setPersonObject] = useState({});
  const { data, starships, vehicles, planet, species } = personObject;
  const [idsObject, setIdsObject] = useState({});
  const [person, setPerson] = useState();
  const [personPlanet, setPersonPlanet] = useState();
  const [personPlanetId, setPersonPlanetId] = useState();
  const [personFilms, setPersonFilms] = useState([]);
  const [personSpecies, setPersonSpecies] = useState([]);
  const [personStarships, setPersonStarships] = useState([]);
  const [personStarshipsIds, setPersonStarshipsIds] = useState([]);
  const [personVehicles, setPersonVehicles] = useState([]);

  // fetch person data
  useEffect(() => {
    const fetchPerson = async () => {
      const response = await fetch(`https://swapi.dev/api/people/${id}`);
      const data = await response.json();
      console.log(data);
      setPerson(data);
      setPersonObject({ data });
    };
    fetchPerson();
  }, []);

  // filter films
  useEffect(() => {
    if (person && films) {
      const ids = person.films.map((film) => {
        return parseInt(film.match(/\/(\d+)\/$/)[1]);
      });
      const filteredFilms = films.filter((film) => {
        return ids.includes(film.episode_id);
      });
      setPersonFilms(filteredFilms);
      setPersonObject((prevValues) => {
        return {
          ...prevValues,
          films: filteredFilms,
        };
      });
    }
    console.log(personFilms);
  }, [person, films]);

  // fetch starships
  useEffect(() => {
    const fetchStarshipsData = async () => {
      if (person && person.starships) {
        try {
          const responses = await Promise.all(
            person.starships.map(async (source) => {
              const response = await fetch(source);
              return response.json();
            })
          );
          setPersonStarships(responses);
          setPersonObject((prevValues) => {
            return {
              ...prevValues,
              starships: responses,
            };
          });
        } catch (error) {
          console.error("Error fetching starships data:", error);
        }
      }
    };
    fetchStarshipsData();
    console.log(personStarships);
  }, [person]);

  // fetch planet
  useEffect(() => {
    const fetchPersonPlanet = async () => {
      if (person && person.homeworld) {
        try {
          console.log(person.homeworld);
          const response = await fetch(person.homeworld);
          const data = await response.json();
          setPersonPlanet(data);
          setPersonObject((prevValues) => {
            return {
              ...prevValues,
              planet: data,
            };
          });
        } catch (error) {
          console.error("Error fetching planets data:", error);
        }
      }
    };
    fetchPersonPlanet();
  }, [person]);

  // fetch vehicles
  useEffect(() => {
    const fetchVehiclesData = async () => {
      if (person && person.vehicles) {
        try {
          const responses = await Promise.all(
            person.vehicles.map(async (source) => {
              const response = await fetch(source);
              return response.json();
            })
          );
          setPersonVehicles(responses);
          setPersonObject((prevValues) => {
            return {
              ...prevValues,
              vehicles: responses,
            };
          });
        } catch (error) {
          console.error("Error fetching vehicles data:", error);
        }
      }
    };
    fetchVehiclesData();
  }, [person]);

  useEffect(() => {
    if (personPlanet && personPlanet.url) {
      const id = parseInt(personPlanet.url.match(/\/(\d+)\/$/)[1]);
      setPersonPlanetId(id);
    }
  }, [personPlanet]);

  // fetch species
  useEffect(() => {
    const fetchSpeciesData = async () => {
      if (person && person.species) {
        try {
          const responses = await Promise.all(
            person.species.map(async (source) => {
              const response = await fetch(source);
              return response.json();
            })
          );
          setPersonObject((prevValues) => {
            return {
              ...prevValues,
              species: responses,
            };
          });
        } catch (error) {
          console.error("Error fetching vehicles data:", error);
        }
      }
    };
    fetchSpeciesData();
  }, [person]);

  // get ids
  useEffect(() => {
    if (data) {
      const starshipsIds = data.starships ? getIds(data.starships) : [];
      const vehiclesIds = data.vehicles ? getIds(data.vehicles) : [];
      console.log(starshipsIds, vehiclesIds);
      const planetId = data.homeworld ? getIds([data.homeworld]) : [];
      const speciesId = data.species ? getIds(data.species) : [];
      setIdsObject((prevValues) => {
        return {
          ...prevValues,
          starshipsIds: starshipsIds,
          vehiclesIds: vehiclesIds,
          planetId: planetId,
          speciesId: speciesId,
        };
      });
    }
  }, [data]);

  return (
    <div className="flex flex-col w-full px-10 h-fit py-10">
      {person && (
        <div className="font-light flex flex-col gap-4">
          <h1 className="text-xl font-normal border-b pb-1 flex items-center">
            <BsPersonFill className="w-12 h-12" />
            &nbsp; Character #{id} - {person.name}
          </h1>
          <div className="mt-5">
            <span className="font-normal">Person birthyear:</span>{" "}
            {person.birth_year}
          </div>
          <div>
            <span className="font-normal">Person eye color:</span>{" "}
            {person.eye_color}
          </div>
          <div>
            <span className="font-normal">Person gender:</span> {person.gender}
          </div>
          <div>
            <span className="font-normal">Person hair color:</span>{" "}
            {person.hair_color}
          </div>
          <div>
            <span className="font-normal">Person height:</span> {person.height}
          </div>
          <div>
            <span className="font-normal">Person homeworld:</span>{" "}
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
            <span className="font-normal">Person mass:</span> {person.mass}
          </div>
          <div>
            <span className="font-normal">Person skin color:</span>{" "}
            {person.skin_color}
          </div>
          <div>
            <span className="font-normal">Person species:</span>{" "}
            {species &&
              idsObject.speciesId &&
              species.map((spece, index) => {
                return (
                  <Tag
                    link={`/species/${idsObject.speciesId[index]}`}
                    element={spece.name}
                  />
                );
              })}
          </div>
          <div>
            <span className="font-normal">Person starships: </span>
            {starships &&
              idsObject.starshipsIds &&
              starships.map((starship, index) => {
                return (
                  <Tag
                    link={`/starships/${idsObject.starshipsIds[index]}`}
                    element={starship.name}
                  />
                );
              })}
          </div>
          <div>
            <span className="font-normal">Person vehicles: </span>{" "}
            {vehicles &&
              idsObject.vehiclesIds &&
              vehicles.map((vehicle, index) => {
                return (
                  <Tag
                    link={`/vehicles/${idsObject.vehiclesIds[index]}`}
                    element={vehicle.name}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Person;
