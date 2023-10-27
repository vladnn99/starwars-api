import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlanetCard from "../components/film/PlanetCard";

const Planets = () => {
  const [sources, setSources] = useState([]);
  const [source, setSource] = useState("https://swapi.dev/api/planets");
  const [planets, setPlanets] = useState([]);
  const [data, setData] = useState();
  const initialSource = "https://swapi.dev/api/planets";

  // const fetchSourcesData = async (source) => {
  //   try {
  //     if (!sources.includes(source)) {
  //       console.log(source);
  //       const response = await fetch(source);
  //       const data = await response.json();
  //       setSources((prevSources) => [...prevSources, source]);
  //       if (data.next) {
  //         fetchSourcesData(data.next);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching planets data", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchSourcesData(initialSource);
  // }, []);

  useEffect(() => {
    const fetchSourceData = async (source) => {
      try {
        const response = await fetch(source);
        setData(await response.json());
      } catch (error) {
        console.error("Error fetching planet data", error);
      }
    };
    fetchSourceData(source);
  }, [source]);

  useEffect(() => {
    if (data) {
      setPlanets(data.results);
    }
  }, [data]);

  const nextPage = () => {
    if (data && data.next) {
      setSource(data.next);
    }
  };

  const prevPage = () => {
    if (data && data.previous) {
      setSource(data.previous);
    }
  };
  // fetch them 1 by one, when loading the pages
  // prepare the pages from router
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl">Planets</div>
      <div className="grid grid-cols-2 gap-6 my-8">
        {planets.map((planet) => {
          return <PlanetCard planet={planet} />;
        })}
      </div>
      <div className="flex justify-between w-full mb-8">
        {data && data.previous && (
          <div className="cursor-pointer" onClick={prevPage}>
            Previous Page
          </div>
        )}{" "}
        {data && data.next && (
          <div className="cursor-pointer" onClick={nextPage}>
            Next Page
          </div>
        )}
      </div>
    </div>
  );
};

export default Planets;
