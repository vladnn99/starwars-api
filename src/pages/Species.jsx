import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpeciesCard from "../components/SpeciesCard";

const Species = () => {
  const [source, setSource] = useState("https://swapi.dev/api/species");
  const [data, setData] = useState();
  const [species, setSpecies] = useState([]);

  // fetch species
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
      setSpecies(data.results);
    }
  }, [data]);
  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-2xl w-full bg-gray-700 items-center justify-center flex py-3">
        Species
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 my-8">
        {species.map((spece) => {
          return <SpeciesCard species={spece} />;
        })}
      </div>
    </div>
  );
};

export default Species;
