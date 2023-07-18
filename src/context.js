import React, { useState, useEffect, createContext, useContext } from "react";
import { getDriversPerYear } from "./api/driverApi";
import { getTeamsPerYear } from "./api/teamsApi";
import {
  getWinnersPerYear,
  getQualifyingResults,
  getRaceResults,
} from "./api/racesApi";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [driverList, setDriverList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [raceList, setRaceList] = useState([]);
  // const [qualifyingList, setQualifyingList] = useState([]);
  // const [raceResults, setRaceResults] = useState([]);

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

  useEffect(() => {
    setLoading(true);
    async function getRaces() {
      const fetchedRaces = await getWinnersPerYear();
      setRaceList(fetchedRaces);
      setLoading(false);
    }
    getRaces();
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   async function getResultsOfQualification() {
  //     const fetchedResults = await getQualifyingResults();
  //     setQualifyingList(fetchedResults);
  //     setLoading(false);
  //   }
  //   getResultsOfQualification();
  // }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   async function getRaceResults() {
  //     const fetchedResults = await getRaceResults();
  //     setQualifyingList(fetchedResults);
  //     setLoading(false);
  //   }
  //   getRaceResults();
  // }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        driverList,
        teamList,
        raceList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
