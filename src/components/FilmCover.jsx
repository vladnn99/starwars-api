import React from "react";

const FilmCover = ({ film }) => {
  // destructure film
  const { title, episode_id, opening_crawl, director, producer, image } = film;

  return (
    <div className="w-64 h-80 flex flex-col items-center relative overflow-hidden group cursor-pointer justify-end">
      <img
        className="absolute object-cover w-full h-full group-hover:scale-110 transition duration-300 ease-out"
        src={image}
        alt=""
      />
      <div className="mb-auto z-10 h-full bg-opacity-80 bg-gray-800 w-full flex items-center justify-center font-semibold group-hover:bg-opacity-90 duration-300 ease-in-out group-hover:h-10 text-2xl group-hover:text-base">
        Episode {episode_id}
      </div>
      <div className="absolute bg-gray-800 z-10 w-full flex items-center justify-center py-2 bg-opacity-90 font-semibold text-xl translate-y-12 group-hover:translate-y-0 duration-300 ease-in-out">
        {title}
      </div>
    </div>
  );
};

export default FilmCover;
