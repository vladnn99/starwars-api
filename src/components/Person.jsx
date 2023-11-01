import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FilmsContext } from "../contexts/FilmsContext";
import { BsPersonFill } from "react-icons/bs";

// needed: species, vehicles
// done: films, planets, starships

const Person = () => {
  const { id } = useParams();
  const { films, ids, getIds } = useContext(FilmsContext);
  const [personObject, setPersonObject] = useState({});
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

  // get ids
  useEffect(() => {
    const starshipsIds = personObject.starships
      ? getIds(personObject.starships)
      : [];
    const vehiclesIds = personObject.vehicles
      ? getIds(personObject.vehicles)
      : [];

    setIdsObject((prevValues) => {
      return {
        ...prevValues,
        starshipsIds: starshipsIds,
        vehiclesIds: vehiclesIds,
      };
    });
  }, [personObject.starships, personObject.vehicles]);

  // get vehiclesIds
  // useEffect(() => {
  //   if (personObject.vehicles) {
  //     getIds(personObject.vehicles);
  //   }
  //   console.log(ids);
  //   setIdsObject((prevValues) => {
  //     return {
  //       ...prevValues,
  //       vehiclesIds: ids,
  //     };
  //   });
  // }, [personObject.vehicles]);

  // useEffect(() => {
  //   if (personStarships) {
  //     getIds(personStarships);
  //   }
  //   console.log(ids);
  //   setPersonObject((prevState) => {
  //     return {
  //       ...prevState,
  //       vehiclesIds: [1, 2, 3],
  //     };
  //   });
  // }, [personPlanet]);

  // useEffect(() => {
  //   if (personFilms) {
  //     console.log(ids);
  //     setPersonObject((prevState) => {
  //       return {
  //         ...prevState,
  //         vehiclesIds2: ["a", "b", "c"],
  //       };
  //     });
  //   }
  // }, [personPlanet]);

  // fetch planet
  useEffect(() => {
    const fetchPersonPlanet = async () => {
      if (person && person.homeworld) {
        try {
          console.log(person.homeworld);
          const response = await fetch(person.homeworld);
          const data = await response.json();
          console.log(data);
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
    console.log(personVehicles);
  }, [person]);

  useEffect(() => {
    if (personPlanet && personPlanet.url) {
      const id = parseInt(personPlanet.url.match(/\/(\d+)\/$/)[1]);
      setPersonPlanetId(id);
    }
  }, [personPlanet]);

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
            {personPlanet && (
              <Link
                to={`/planets/${personPlanetId}`}
                className="bg-gray-700 my-1 mx-1 px-5 py-1 rounded-md"
              >
                {personPlanet.name}
              </Link>
            )}
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
            {person.species}
          </div>
          <div>
            <span className="font-normal">Person starships: </span>
            {personStarships &&
              personStarships.map((starship) => {
                return (
                  <Link
                    to={"/"}
                    className="bg-gray-700 my-1 mx-1 px-5 py-1 rounded-md"
                  >
                    {starship.name}
                  </Link>
                );
              })}
          </div>
          <div>
            <span className="font-normal">Person vehicles: </span>{" "}
            {personVehicles &&
              personVehicles.map((vehicle) => {
                return (
                  <Link
                    to={"/"}
                    className="bg-gray-700 my-1 mx-1 px-5 py-1 rounded-md"
                  >
                    {vehicle.name}
                  </Link>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Person;
