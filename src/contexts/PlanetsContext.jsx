import React, { createContext, useState, useEffect } from "react";

export const PlanetsContext = createContext();

const PlanetsProvider = ({ children }) => {
  const [pagesNo, setPagesNo] = useState(0);
  useEffect(() => {
    const fetchPages = async () => {
      const response = await fetch("https://swapi.dev/api/planets");
      const data = await response.json();
      console.log(data.count, data.results.length);
      setPagesNo(parseInt(data.count / data.results.length));
    };
    fetchPages();
  }, []);
  return (
    <PlanetsContext.Provider value={pagesNo}>
      {children}
    </PlanetsContext.Provider>
  );
};

export default PlanetsProvider;
