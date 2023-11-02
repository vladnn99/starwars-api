import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PlanetCard = (props) => {
  const { climate, name, population, url } = props.planet;
  const [planetId, setPlanetId] = useState();

  useEffect(() => {
    if (url) {
      const id = parseInt(url.match(/\/(\d+)\/$/)[1]);
      setPlanetId(id);
    }
  }, [url]);

  return (
    <div className="border p-8 w-full md:w-64 flex flex-col justify-center items-center">
      <div className="text-lg">Name</div>
      <div className="font-light">{name}</div>
      <div className="text-lg">Population</div>
      <div className="font-light">{population}</div>
      <div className="text-lg">Climate</div>
      <div className="font-light">{climate}</div>
      <div className="text-lg">Url</div>
      <div className="font-light">{url}</div>
      <Link to={`/planets/${planetId}`} className="w-full">
        <button className="mt-4 text-sm bg-gray-700 py-2 w-full">
          See planet details
        </button>
      </Link>
    </div>
  );
};

export default PlanetCard;
