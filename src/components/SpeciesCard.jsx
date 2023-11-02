import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilmsContext } from "../contexts/FilmsContext";

const SpeciesCard = (props) => {
  const { name, classification, designation, average_height, url } =
    props.species;
  const { getIds } = useContext(FilmsContext);
  const [speciesId, setSpeciesId] = useState();

  //   need pagination
  useEffect(() => {
    if (url) {
      const [id] = getIds([url]);
      setSpeciesId(id);
    }
  }, [url]);

  return (
    <div>
      <div className="border p-8 w-full md:w-64 flex flex-col justify-center items-center">
        <div className="text-lg">Name</div>
        <div className="font-light">{name}</div>
        <div className="text-lg">Classification</div>
        <div className="font-light">{classification}</div>
        <div className="text-lg">Designation</div>
        <div className="font-light">{designation}</div>
        <div className="text-lg">Url</div>
        <div className="font-light">{url}</div>
        <Link to={`/species/${speciesId}`} className="w-full">
          <button className="mt-4 text-sm bg-gray-700 py-2 w-full">
            See species details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SpeciesCard;
