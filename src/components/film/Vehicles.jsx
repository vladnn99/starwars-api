import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import Tag from "../Tag";
import { FilmsContext } from "../../contexts/FilmsContext";

const Vehicles = (props) => {
  const { film } = props;
  const { getIds } = useContext(FilmsContext);
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
    if (film) {
      const ids = getIds(film.vehicles);
      setVehiclesIds(ids);
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
              <Tag
                link={`/vehicles/${vehiclesIds[index]}`}
                element={vehicle.name}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Vehicles;
