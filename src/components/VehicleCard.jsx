import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilmsContext } from "../contexts/FilmsContext";

const VehicleCard = (props) => {
  const { name, url, cargo_capacity, max_atmospering_speed, vehicle_class } =
    props.vehicle;
  const { getIds } = useContext(FilmsContext);
  const [vehicleId, setVehicleId] = useState();

  useEffect(() => {
    if (url) {
      const [id] = getIds([url]);
      setVehicleId(id);
    }
  }, [url]);

  return (
    <div>
      <div className="border p-8 w-full md:w-64 flex flex-col justify-center items-center">
        <div className="text-lg">Name</div>
        <div className="font-light">{name}</div>
        <div className="text-lg">Vehicle class</div>
        <div className="font-light">{vehicle_class}</div>
        <div className="text-lg">Cargo capacity</div>
        <div className="font-light">{cargo_capacity}</div>
        <Link to={`/vehicles/${vehicleId}`} className="w-full">
          <button className="mt-4 text-sm bg-gray-700 py-2 w-full">
            See vehicle details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VehicleCard;
