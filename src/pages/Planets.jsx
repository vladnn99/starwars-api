import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Planets = () => {
  const [sources, setSources] = useState([]);
  const initialSource = "https://swapi.dev/api/planets";

  const fetchSourcesData = async (source) => {
    try {
      if (!sources.includes(source)) {
        console.log(source);
        const response = await fetch(source);
        const data = await response.json();
        setSources((prevSources) => [...prevSources, source]);
        if (data.next) {
          fetchSourcesData(data.next);
        }
      }
    } catch (error) {
      console.error("Error fetching planets data", error);
    }
  };

  // fetch them 1 by one, when loading the pages
  // prepare the pages from router

  useEffect(() => {
    fetchSourcesData(initialSource);
  }, []);

  return <div className="flex">{/* Planets */}</div>;
};

export default Planets;
