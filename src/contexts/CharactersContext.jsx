import React, { createContext, useState, useEffect } from "react";

// create characters context
export const CharactersContext = createContext();

export const CharactersProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch("https://swapi.dev/api/people/");
      const data = await response.json();
      setCharacters(data.results);
    };
    fetchCharacters();
  }, []);
  return (
    <CharactersContext.Provider value={{ characters }}>
      {children}
    </CharactersContext.Provider>
  );
};

export default CharactersProvider;
