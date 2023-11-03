import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PersonCard = (props) => {
  const { url, name, gender, birth_year } = props.person;
  const [personId, setPersonId] = useState();
  useEffect(() => {
    if (url) {
      const id = parseInt(url.match(/\/(\d+)\/$/)[1]);
      setPersonId(id);
    }
  }, [url]);

  return (
    <div className="border p-8 w-full md:w-64 flex flex-col justify-center items-center">
      <div className="text-lg">Name</div>
      <div className="font-light">{name}</div>
      <div className="text-lg">Gender</div>
      <div className="font-light">{gender}</div>
      <div className="text-lg">Birth Year</div>
      <div className="font-light">{birth_year}</div>
      <Link to={`/people/${personId}`} className="w-full">
        <button className="mt-4 text-sm bg-gray-700 py-2 w-full">
          See person details
        </button>
      </Link>
    </div>
  );
};

export default PersonCard;
