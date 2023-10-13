import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-700 min-h-screen h-fit w-72 z-10 flex flex-col items-center gap-5 pt-20">
      <Link
        className=" border-separate transition hover:bg-yellow-300 hover:text-gray-800 duration-300 ease-in w-full py-3 flex items-center justify-center cursor-pointer text-xl "
        to={"/films"}
      >
        Films
      </Link>
      <Link
        to={"/people"}
        className=" transition hover:bg-yellow-300 hover:text-gray-800 duration-300 ease-in w-full py-3 flex items-center justify-center cursor-pointer text-xl "
      >
        People
      </Link>
      <Link
        to={"/planets"}
        className=" transition hover:bg-yellow-300 hover:text-gray-800 duration-300 ease-in w-full py-3 flex items-center justify-center cursor-pointer text-xl "
      >
        Planets
      </Link>
      <Link
        to={"/species"}
        className=" transition hover:bg-yellow-300 hover:text-gray-800 duration-300 ease-in w-full py-3 flex items-center justify-center cursor-pointer text-xl "
      >
        Species
      </Link>
      <Link
        to={"/starships"}
        className=" transition hover:bg-yellow-300 hover:text-gray-800 duration-300 ease-in w-full py-3 flex items-center justify-center cursor-pointer text-xl "
      >
        Starships
      </Link>
      <Link
        to={"/vehicles"}
        className=" transition hover:bg-yellow-300 hover:text-gray-800 duration-300 ease-in w-full py-3 flex items-center justify-center cursor-pointer text-xl "
      >
        Vehicles
      </Link>
    </div>
  );
};

export default Sidebar;
