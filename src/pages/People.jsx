import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PersonCard from "../components/PersonCard";

const People = () => {
  const [source, setSource] = useState("https://swapi.dev/api/people");
  const [people, setPeople] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchSourceData = async (source) => {
      try {
        const response = await fetch(source);
        setData(await response.json());
      } catch (error) {
        console.error("Error fetching people data", error);
      }
    };
    fetchSourceData(source);
  }, [source]);

  useEffect(() => {
    if (data) {
      setPeople(data.results);
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

  console.log(people);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-2xl w-full bg-gray-700 items-center justify-center flex py-3">
        People
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 my-12">
        {people &&
          people.map((person) => {
            return <PersonCard person={person} />;
          })}
      </div>
      <div className="flex justify-between w-full mb-8 px-5">
        {data && data.previous && (
          <Link
            to={`${
              currentPage === 2 ? "/people" : `/people/?page=${currentPage - 1}`
            } `}
            className="cursor-pointer flex justify-end"
            onClick={prevPage}
          >
            Previous Page
          </Link>
        )}
        {data && data.next && (
          <Link
            to={`/people/?page=${currentPage + 1}`}
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

export default People;
