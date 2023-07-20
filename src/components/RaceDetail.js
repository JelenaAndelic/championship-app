import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { useParams } from "react-router-dom";
import { Loading } from "./Loading";
import { getRaceDetail, getQualifyingResults } from "../api/racesApi";
import { findFlagUrlByNationality } from "country-flags-svg";
import { findFlagUrlByCountryName } from "country-flags-svg";
import useTableFilter from "../hooks/useTableFilter";
import RaceResultsTable from "./RaceResultsTable";
import { Link } from "react-router-dom";

export const RaceDetail = () => {
  const { loading, setLoading } = useGlobalContext();
  const [raceDetail, setRaceDetail] = useState({});
  const [qualifyingResults, setQualifyingResults] = useState([]);

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
    async function getResultsOfQualifying() {
      const fetchedData = await getQualifyingResults(params.raceId);
      setQualifyingResults(fetchedData);
    }
    getResultsOfQualifying();
  }, [params.raceId]);

  const [filterTable, handleFilterChange, applyFilter] = useTableFilter(
    qualifyingResults.MRData?.RaceTable.Races[0].QualifyingResults
  );

  const filteredQualifyingResults = applyFilter(
    qualifyingResults.MRData?.RaceTable.Races[0].QualifyingResults
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {raceDetail.MRData?.RaceTable.Races.map((detail) => {
        const { raceName, date } = detail;
        const { url } = detail.Circuit;
        const { country, locality } = detail.Circuit.Location;
        return (
          <div>
            <h2>
              <img
                style={{ width: 40, height: 20 }}
                src={findFlagUrlByCountryName(
                  country !== "Korea" ? country : "South Korea"
                )}
                alt={country + "flag"}
              />
              {raceName}
            </h2>
            <p>Country: {country}</p>
            <p>Location: {locality}</p>
            <p>Date: {date}</p>
            <p>
              Full Report: <a href={url}>Click here</a>
            </p>
          </div>
        );
      })}
      <h2>Qualifying Results</h2>
      <div>
        <label htmlFor="filter">Search:</label>
        <input
          type="text"
          id="filter"
          value={filterTable}
          onChange={handleFilterChange}
        />
      </div>
      <table>
        <tbody>
          <tr>
            <th>Pos</th>
            <th>Driver</th>
            <th>Teams</th>
            <th>Best Time</th>
          </tr>
          {filteredQualifyingResults?.map((race, i) => {
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
                  <Link to={`/${driverId}`}>{familyName}</Link>
                </td>
                <td>{team}</td>
                <td>{bestTime}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr />
      <h2>Race Results</h2>
      <RaceResultsTable />
    </div>
  );
};
