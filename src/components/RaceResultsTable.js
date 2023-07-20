import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import { useParams } from "react-router-dom";
import { Loading } from "./Loading";
import { getRaceResults } from "../api/racesApi";
import { findFlagUrlByNationality } from "country-flags-svg";
import useTableFilter from "../hooks/useTableFilter";
import { Link } from "react-router-dom";

const RaceResultsTable = () => {
  const { loading, setLoading } = useGlobalContext();
  const [raceResults, setRaceResults] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function getResultsOfRaces() {
      const fetchedResults = await getRaceResults(params.raceId);
      setRaceResults(fetchedResults);
    }
    getResultsOfRaces();
  }, [params.raceId]);

  const [filterTable, handleFilterChange, applyFilter] = useTableFilter(
    raceResults.MRData?.RaceTable.Races[0].Results
  );

  const filteredRaceResults = applyFilter(
    raceResults.MRData?.RaceTable.Races[0].Results
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <>
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
            <th>Team</th>
            <th>Result</th>
            <th>Points</th>
          </tr>
          {filteredRaceResults?.map((race, i) => {
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
                  <Link to={`/${driverId}`}>{familyName}</Link>
                </td>
                <td>{team}</td>
                <td>{time ? time : status}</td>
                <td>{points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default RaceResultsTable;
