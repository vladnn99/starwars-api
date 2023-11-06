import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilmsContext } from "../contexts/FilmsContext";

const StarshipCard = (props) => {
  const { name, length, passengers, url } = props.starship;
  const { getIds } = useContext(FilmsContext);
  const [starshipId, setStarshipId] = useState([]);

  useEffect(() => {
    if (url) {
      const [id] = getIds([url]);
      setStarshipId(id);
    }
  }, [url]);

  return (
    <div>
      <div className="border p-8 w-full md:w-64 flex flex-col justify-center items-center">
        <div className="text-lg">Name</div>
        <div className="font-light">{name}</div>
        <div className="text-lg">Length</div>
        <div className="font-light">{length}</div>
        {/* <div className="text-lg">Manufacturer</div>
        <div className="font-light">{manufacturer}</div> */}
        <div className="text-lg">Passengers</div>
        <div className="font-light">{passengers}</div>
        <Link to={`/starships/${starshipId}`} className="w-full">
          <button className="mt-4 text-sm bg-gray-700 py-2 w-full">
            See starship details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StarshipCard;
