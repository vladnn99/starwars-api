import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col gap-8 w-full items-center mx-10">
      <Link
        className="border transition hover:bg-yellow-300 hover:text-gray-800 duration-300 ease-in rounded-md w-full md:px-32 md:max-w-lg py-5 flex items-center justify-center cursor-pointer text-xl hover:scale-110"
        to={"/films"}
      >
        Films
      </Link>
      <Link
        to={"/people"}
        className="border transition hover:bg-yellow-300 hover:text-gray-800 duration-300 ease-in rounded-md w-full md:px-32 md:max-w-lg py-5 flex items-center justify-center cursor-pointer text-xl hover:scale-110"
      >
        People
      </Link>
      <Link
        to={"/planets"}
        className="border transition hover:bg-yellow-300 hover:text-gray-800 duration-300 ease-in rounded-md w-full md:px-32 md:max-w-lg py-5 flex items-center justify-center cursor-pointer text-xl hover:scale-110"
      >
        Planets
      </Link>
      <Link
        to={"/species"}
        className="border transition hover:bg-yellow-300 hover:text-gray-800 duration-300 ease-in rounded-md w-full md:px-32 md:max-w-lg py-5 flex items-center justify-center cursor-pointer text-xl hover:scale-110"
      >
        Species
      </Link>
      <Link
        to={"/starships"}
        className="border transition hover:bg-yellow-300 hover:text-gray-800 duration-300 ease-in rounded-md w-full md:px-32 md:max-w-lg py-5 flex items-center justify-center cursor-pointer text-xl hover:scale-110"
      >
        Starships
      </Link>
      <Link
        to={"/vehicles"}
        className="border transition hover:bg-yellow-300 hover:text-gray-800 duration-300 ease-in rounded-md w-full md:px-32 md:max-w-lg py-5 flex items-center justify-center cursor-pointer text-xl hover:scale-110"
      >
        Vehicles
      </Link>
    </div>
  );
};

export default Home;
