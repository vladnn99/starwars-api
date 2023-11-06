import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarshipCard from "../components/StarshipCard";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

const Starships = () => {
  const [source, setSource] = useState("https://swapi.dev/api/starships");
  const [data, setData] = useState();
  const [starships, setStarships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // fetch starships data
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
      setStarships(data.results);
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
        Starships
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 my-8">
        {starships.map((starship) => {
          return <StarshipCard starship={starship} />;
        })}
      </div>
      <div className="flex justify-center w-full mb-8 px-5 gap-3">
        {data && data.previous && (
          <Link
            to={`${
              currentPage === 2
                ? "/starships"
                : `/starships/?page=${currentPage - 1}`
            } `}
            className="cursor-pointer flex justify-end items-center group"
            onClick={prevPage}
          >
            <BsChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition duration-300 ease-out" />
            Previous Page
          </Link>
        )}
        {data && data.next && (
          <Link
            to={`/starships/?page=${currentPage + 1}`}
            className="cursor-pointer flex items-center group"
            onClick={nextPage}
          >
            Next Page
            <BsChevronRight className="w-8 h-8 group-hover:translate-x-1 transition duration-300 ease-out" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Starships;
