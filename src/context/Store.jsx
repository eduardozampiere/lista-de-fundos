import React, { useState, useContext, createContext } from "react";

const StoreContext = createContext();

export default function StoreProvider({ children }) {
  const [filters, setFilters] = useState(null);
  const [data, setData] = useState(null);
  const [currentFilters, setCurrentFilters] = useState({});

  return (
    <StoreContext.Provider
      value={{
        filters,
        setFilters,
        data,
        setData,
        currentFilters,
        setCurrentFilters,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
