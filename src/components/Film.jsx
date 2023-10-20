import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FilmsContext } from "../contexts/FilmsContext";
import { Link } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";

const Film = () => {
  const { id } = useParams();
  const { films, setFilms } = useContext(FilmsContext);
  const [film, setFilm] = useState({});
  const [charactersData, setCharactersData] = useState([]);
  const [charactersIds, setCharactersIds] = useState([]);
  const [planetsData, setPlanetsData] = useState([]);
  const [planetsIds, setPlanetsIds] = useState([]);
  const [vehiclesData, setVehiclesData] = useState([]);
  const [vehiclesIds, setVehiclesIds] = useState([]);

  useEffect(() => {
    setFilm(films[id - 1]);
  }, [films, film, id]);

  useEffect(() => {
    // Fetch characters data
    const fetchCharactersData = async () => {
      if (film && film.characters) {
        try {
          const responses = await Promise.all(
            film.characters.map(async (source) => {
              const response = await fetch(source);
              return response.json();
            })
          );
          // Now 'responses' is an array of character data
          console.log(responses);
          setCharactersData(responses);
        } catch (error) {
          console.error("Error fetching characters data:", error);
        }
      }
    };
    fetchCharactersData();
  }, [film]);

  useEffect(() => {
    if (film && film.characters) {
      try {
        const ids = film.characters.map((character) => {
          return parseInt(character.match(/\/(\d+)\/$/)[1]);
        });
        setCharactersIds(ids);
      } catch (error) {
        console.error("Error getting films ID's", error);
      }
    }
  }, [film]);

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
          console.log(responses);
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

  useEffect(() => {
    // fetch vehicles data
    const fetchVehiclesData = async () => {
      if (film && film.vehicles) {
        try {
          const responses = await Promise.all(
            film.vehicles.map(async (source) => {
              const response = await fetch(source);
              return response.json();
            })
          );
          console.log(responses);
          setVehiclesData(responses);
        } catch (error) {
          console.error("Error fetching planets data", error);
        }
      }
    };
    fetchVehiclesData();
  }, [film]);

  useEffect(() => {
    if (film && film.vehicles) {
      try {
        const ids = film.vehicles.map((vehicle) => {
          return parseInt(vehicle.match(/\/(\d+)\/$/)[1]);
        });
        setVehiclesIds(ids);
      } catch (error) {
        console.error("Error getting films ID's", error);
      }
    }
  }, [film]);

  if (!films || films.length === 0) {
    return <div>Loading film...</div>;
  }

  return (
    <div className="flex flex-col items-center w-full px-10">
      {/* <div>{film && film.title}</div> */}
      {/* {film && setChar()} */}
      {film && (
        <div>
          <Link
            to={"/films"}
            className="absolute text-white text-xl top-5 right-5 z-10"
          >
            <IoCloseCircleOutline className="text-5xl transition-all duration-300 hover:rotate-90 ease-in" />
          </Link>
          <h1 className="text-xl font-semibold">
            Episode {film.episode_id}: {film.title}
          </h1>
          <div className="flex mt-5 pb-5 max-w-2xl">
            <div className="flex-1">
              {/* poster */}
              <img className="object-cover" src={film.image} alt="" />
            </div>
            <div className="flex flex-col flex-1 px-5">
              {/* film details */}
              <p className="text-md leading-tight">Director: {film.director}</p>
              <p className="text-md leading-tight">Producer: {film.producer}</p>
              <p className="font-semibold mt-8">Opening Crawl</p>
              <p className="font-light"> {film.opening_crawl}</p>
            </div>
            {/* characters */}
          </div>
          <div className="border-b w-full"></div>
          <div className="mt-10 self-start border-b pb-5">
            <h2 className="text-lg">Characters</h2>
            <div className="flex flex-wrap">
              {(!charactersData || charactersData.length === 0) && (
                <div>
                  <p>Characters Loading...</p>
                </div>
              )}
              {(charactersData || charactersData.length !== 0) &&
                charactersData.map((character, index) => {
                  return (
                    <Link
                      to={`/people/${charactersIds[index]}`}
                      className="bg-gray-700 my-1 mx-1 px-5 py-1 rounded-md"
                    >
                      {character.name}
                    </Link>
                  );
                })}
            </div>
          </div>
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
                      to={`/planets/${planetsIds[index]}`}
                      className="bg-gray-700 my-1 mx-1 px-5 py-1 rounded-md"
                    >
                      {planet.name}
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="mt-10 self-start border-b pb-5">
            <h2 className="text-lg">Vehicles</h2>
            <div className="flex flex-wrap">
              {(!vehiclesData || vehiclesData.length === 0) && (
                <div>
                  <p>Vehicles Loading...</p>
                </div>
              )}
              {(vehiclesData || vehiclesData.length !== 0) &&
                vehiclesData.map((vehicle, index) => {
                  return (
                    <Link
                      to={`/vehicles/${vehiclesIds[index]}`}
                      className="bg-gray-700 my-1 mx-1 px-5 py-1 rounded-md"
                    >
                      {vehicle.name}
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Film;
