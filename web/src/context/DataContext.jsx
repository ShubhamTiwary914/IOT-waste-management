import React, { createContext, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const foodItemsCount = 100;
  // const recentMatches = []; // Array of recent matches
  // const testimonials = []; // Array of testimonials

  return (
    <DataContext.Provider
      value={{ foodItemsCount, recentMatches, testimonials }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
