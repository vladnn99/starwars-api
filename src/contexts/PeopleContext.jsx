import React, { createContext, useState, useEffect } from "react";

// create characters context
export const PeopleContext = createContext();

export const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  useEffect(() => {
    const fetchPeople = async () => {
      const response = await fetch("https://swapi.dev/api/people/");
      const data = await response.json();
      setPeople(data.results);
    };
    fetchPeople();
  }, []);
  return (
    <PeopleContext.Provider value={{ people }}>
      {children}
    </PeopleContext.Provider>
  );
};

export default PeopleProvider;
