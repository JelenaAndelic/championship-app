import React, { useState, useEffect, createContext, useContext } from "react";
import {
  getDriversPerYear,
  getDriverDetails,
  getDriverRaces,
} from "./api/driverApi";
import { getTeamsPerYear } from "./api/teamsApi";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [driverList, setDriverList] = useState([]);
  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    setLoading(true);
    async function getDriverList() {
      const fetchedDriverList = await getDriversPerYear();
      setDriverList(fetchedDriverList);
      setLoading(false);
    }
    getDriverList();
  }, []);

  useEffect(() => {
    setLoading(true);
    async function getTeams() {
      const fetchedTeams = await getTeamsPerYear();
      setTeamList(fetchedTeams);
      setLoading(false);
    }
    getTeams();
  }, []);

  return (
    <AppContext.Provider value={{ loading, setLoading, driverList, teamList }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
