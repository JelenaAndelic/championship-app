import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { useParams } from "react-router-dom";
import { Loading } from "./Loading";
import {
  getRaceDetail,
  getQualifyingResults,
  getRaceResults,
} from "../api/racesApi";
import { findFlagUrlByNationality } from "country-flags-svg";
import { findFlagUrlByCountryName } from "country-flags-svg";

export const RaceDetail = () => {
  const { loading, setLoading } = useGlobalContext();
  const [raceDetail, setRaceDetail] = useState([]);
  const [qualifyingResults, setQualifyingResults] = useState([]);
  const [raceResults, setRaceResults] = useState([]);

  const params = useParams();

  useEffect(() => {
    setLoading(true);
    async function getDetailsOfRace() {
      const fetchedDetails = await getRaceDetail(params.raceId);
      setRaceDetail(fetchedDetails);
      setLoading(false);
      console.log(fetchedDetails);
    }
    getDetailsOfRace();
  }, [params.raceId]);

  useEffect(() => {
    setLoading(true);
    async function getResultsOfQualifying() {
      const fetchedData = await getQualifyingResults(params.raceId);
      setQualifyingResults(fetchedData);
      setLoading(false);
    }
    getResultsOfQualifying();
  }, [params.raceId]);

  useEffect(() => {
    async function getResultsOfRaces() {
      const fetchedResults = await getRaceResults(params.raceId);
      setRaceResults(fetchedResults);
    }
    getResultsOfRaces();
  }, [params.raceId]);

  const name = raceDetail.MRData?.RaceTable.Races[0].raceName;
  const date = raceDetail.MRData?.RaceTable.Races[0].date;
  const country =
    raceDetail.MRData?.RaceTable.Races[0].Circuit.Location.country;
  const report = raceDetail.MRData?.RaceTable.Races[0].url;
  const location =
    raceDetail.MRData?.RaceTable.Races[0].Circuit.Location.locality;

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h2>
        {/* <img
          style={{ width: 40, height: 20 }}
          src={findFlagUrlByCountryName(country)}
          alt={country + "flag"}
        /> */}
        {name}
      </h2>
      <p>Country: {country}</p>
      <p>Location: {location}</p>
      <p>Date: {date}</p>
      <p>
        Full Report: <a href={report}>Click here</a>
      </p>

      <h2>Qualifying Results</h2>
      <table>
        <tbody>
          <tr>
            <th>Pos</th>
            <th>Driver</th>
            <th>Teams</th>
            <th>Best Time</th>
          </tr>
          {qualifyingResults.MRData?.RaceTable.Races[0].QualifyingResults.map(
            (race, i) => {
              const { familyName, driverId } = race.Driver;
              const { name: team } = race.Constructor;
              const { nationality } = race.Driver;
              const times = [race.Q1, race.Q2, race.Q3];
              let bestTime = null;

              for (let time of times) {
                if (time) {
                  if (!bestTime || time < bestTime) {
                    bestTime = time;
                  }
                }
              }

              return (
                <tr key={driverId}>
                  <td>{i + 1}</td>
                  <td>
                    <img
                      style={{ width: 40, height: 20 }}
                      src={findFlagUrlByNationality(nationality)}
                      alt={nationality + "flag"}
                    />
                    {familyName}
                  </td>
                  <td>{team}</td>
                  <td>{bestTime}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      <h2>Race Results</h2>
      <table>
        <tbody>
          <tr>
            <th>Pos</th>
            <th>Driver</th>
            <th>Team</th>
            <th>Result</th>
            <th>Points</th>
          </tr>
          {raceResults.MRData?.RaceTable.Races[0].Results.map((race, i) => {
            const { familyName, driverId } = race.Driver;
            const { name: team } = race.Constructor;
            const { nationality } = race.Driver;
            const { time } = race.Time || { time: null };
            const { status } = race;
            const { points } = race;

            return (
              <tr key={driverId}>
                <td>{i + 1}</td>
                <td>
                  <img
                    style={{ width: 40, height: 20 }}
                    src={findFlagUrlByNationality(nationality)}
                    alt={nationality + "flag"}
                  />
                  {familyName}{" "}
                </td>
                <td>{team}</td>
                <td>{time ? time : status}</td>
                <td>{points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
