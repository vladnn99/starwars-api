import React from "react";
import { Link } from "react-router-dom";

const PlanetCard = (props) => {
  const { climate, name, population } = props.planet;
  return (
    <div className="border p-8 w-64 cursor-pointer flex flex-col justify-center items-center">
      <div className="text-lg">Name</div>
      <div className="font-light">{name}</div>
      <div className="text-lg">Population</div>
      <div className="font-light">{population}</div>
      <div className="text-lg">Climate</div>
      <div className="font-light">{climate}</div>
      <Link to={"/"} className="w-full">
        <button className="mt-4 text-sm bg-gray-700 py-2 w-full">
          See planet details
        </button>
      </Link>
    </div>
  );
};

export default PlanetCard;
