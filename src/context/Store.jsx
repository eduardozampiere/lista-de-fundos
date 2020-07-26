import React, { useState, useContext, createContext } from "react";

const StoreContext = createContext();

export default function StoreProvider({ children }) {
  const [filters, setFilters] = useState(null);

  //top filters
  const [minimumAply, setMinimumAply] = useState(null);
  const [minimumDays, setMinimumDays] = useState(null);
  const [risk, setRisk] = useState(null);
  const [fundName, setFundName] = useState("");

  //side filters
  const [mainFilter, setMainFilter] = useState([]);
  return (
    <StoreContext.Provider
      value={{
        filters,
        setFilters,
        minimumAply,
        setMinimumAply,
        minimumDays,
        setMinimumDays,
        fundName,
        setFundName,
        risk,
        setRisk,
        mainFilter,
        setMainFilter,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
