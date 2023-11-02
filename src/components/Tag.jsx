import React from "react";
import { Link } from "react-router-dom";

const Tag = (props) => {
  const { link, element } = props;

  return (
    <Link to={link} className="bg-gray-700 my-1 mx-1 px-5 py-1 rounded-md">
      {element}
    </Link>
  );
};

export default Tag;
