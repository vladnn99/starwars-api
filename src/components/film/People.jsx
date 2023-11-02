import React, { useContext, useState, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import Tag from "../Tag";
import { FilmsContext } from "../../contexts/FilmsContext";

const People = (props) => {
  const { getIds } = useContext(FilmsContext);
  const { film } = props;
  const [peopleData, setPeopleData] = useState([]);
  const [peopleIds, setPeopleIds] = useState([]);
  useEffect(() => {
    // Fetch characters data
    const fetchPeopleData = async () => {
      if (film && film.characters) {
        try {
          const responses = await Promise.all(
            film.characters.map(async (source) => {
              const response = await fetch(source);
              return response.json();
            })
          );
          // Now 'responses' is an array of character data
          setPeopleData(responses);
        } catch (error) {
          console.error("Error fetching characters data:", error);
        }
      }
    };
    fetchPeopleData();
  }, [film]);

  useEffect(() => {
    if (film) {
      const ids = getIds(film.characters);
      setPeopleIds(ids);
    }
  }, [film]);

  return (
    <div className="mt-10 self-start border-b pb-5">
      <h2 className="text-lg">People</h2>
      <div className="flex flex-wrap">
        {(!peopleData || peopleData.length === 0) && (
          <div>
            <p>People Loading...</p>
          </div>
        )}
        {(peopleData || peopleData.length !== 0) &&
          peopleData.map((person, index) => {
            return (
              <Tag
                key={peopleIds[index]}
                link={`/people/${peopleIds[index]}`}
                element={person.name}
              />
            );
          })}
      </div>
    </div>
  );
};

export default People;
