import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpeciesCard from "../components/SpeciesCard";

const Species = () => {
  const [source, setSource] = useState("https://swapi.dev/api/species");
  const [data, setData] = useState();
  const [species, setSpecies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  const nextPage = () => {
    if (data && data.next) {
      setSource(data.next);
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (data && data.previous) {
      setSource(data.previous);
      setCurrentPage(currentPage - 1);
    }
  };
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
      <div className="flex justify-between w-full mb-8 px-5">
        {data && data.previous && (
          <Link
            to={`${
              currentPage === 2
                ? "/species"
                : `/species/?page=${currentPage - 1}`
            } `}
            className="cursor-pointer flex justify-end"
            onClick={prevPage}
          >
            Previous Page
          </Link>
        )}
        {data && data.next && (
          <Link
            to={`/species/?page=${currentPage + 1}`}
            className="cursor-pointer ml-auto"
            onClick={nextPage}
          >
            Next Page
          </Link>
        )}
      </div>
    </div>
  );
};

export default Species;
