import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";

const Vehicles = (props) => {
  const { film } = props;
  const [vehiclesData, setVehiclesData] = useState([]);
  const [vehiclesIds, setVehiclesIds] = useState([]);
  useEffect(() => {
    // fetch vehicles data
    const fetchVehiclesData = async () => {
      if (film && film.vehicles) {
        try {
          const responses = await Promise.all(
            film.vehicles.map(async (source) => {
              const response = await fetch(source);
              return response.json();
            })
          );
          setVehiclesData(responses);
        } catch (error) {
          console.error("Error fetching planets data", error);
        }
      }
    };
    fetchVehiclesData();
  }, [film]);

  useEffect(() => {
    if (film && film.vehicles) {
      try {
        const ids = film.vehicles.map((vehicle) => {
          return parseInt(vehicle.match(/\/(\d+)\/$/)[1]);
        });
        setVehiclesIds(ids);
      } catch (error) {
        console.error("Error getting films ID's", error);
      }
    }
  }, [film]);
  return (
    <div className="mt-10 self-start border-b pb-5">
      <h2 className="text-lg">Vehicles</h2>
      <div className="flex flex-wrap">
        {(!vehiclesData || vehiclesData.length === 0) && (
          <div>
            <p>Vehicles Loading...</p>
          </div>
        )}
        {(vehiclesData || vehiclesData.length !== 0) &&
          vehiclesData.map((vehicle, index) => {
            return (
              <Link
                key={vehiclesIds[index]}
                to={`/vehicles/${vehiclesIds[index]}`}
                className="bg-gray-700 my-1 mx-1 px-5 py-1 rounded-md"
              >
                {vehicle.name}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Vehicles;
