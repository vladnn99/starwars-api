import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Planets = () => {
  const [planets, setPlanets] = useState([]);
  const [source, setSource] = useState("https://swapi.dev/api/planets/");

  // fetch planets data
  const fetchPlanetsData = async (source) => {
    try {
      const response = await fetch(source);
      const data = await response.json();
      setPlanets((prevPlanets) => [...prevPlanets, data.results]);
      console.log(planets.length);
      if (data.next === null || planets.length === 5) {
        setSource(null);
      } else {
        setSource(data.next);
      }
    } catch (error) {
      console.error("Error fetching planets data", error);
    }
  };

  useEffect(() => {
    if (source) {
      fetchPlanetsData(source);
    }
  }, [source]);

  if (!source) {
    console.log(planets);
  }

  return <div className="flex">{/* Planets */}</div>;
};

export default Planets;
