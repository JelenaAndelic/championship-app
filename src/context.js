import React, { useState, useEffect, createContext, useContext } from "react";
import {
  getDriversPerYear,
  getDriverDetails,
  getDriverRaces,
} from "./api/driverApi";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [driverList, setDriverList] = useState([]);
  // const [driverDetail, setDriverDetail] = useState([]);

  useEffect(() => {
    setLoading(true);
    async function getDriverList() {
      const fetchedDriverList = await getDriversPerYear();
      setDriverList(fetchedDriverList);
      setLoading(false);
    }
    getDriverList();
  }, []);

  return (
    <AppContext.Provider value={{ loading, setLoading, driverList }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
