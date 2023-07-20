import React, { useState, useEffect } from "react";
import { getTeamDetails, getTeamResultsPerYear } from "../api/teamsApi";
import { useGlobalContext } from "../context";
import { useParams } from "react-router-dom";
import { Loading } from "./Loading";
import { findFlagUrlByCountryName } from "country-flags-svg";
import { findFlagUrlByNationality } from "country-flags-svg";
import useTableFilter from "../hooks/useTableFilter";
import { Link } from "react-router-dom";

export const TeamDetail = () => {
  const { loading, setLoading } = useGlobalContext();
  const [teamDetail, setTeamDetail] = useState([]);
  const [teamResults, setTeamResults] = useState([]);
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    async function getDetails() {
      const fetchedDetails = await getTeamDetails(params.constructorId);
      setTeamDetail(fetchedDetails);
      setLoading(false);
    }
    getDetails();
  }, [params.constructorId]);

  useEffect(() => {
    setLoading(true);
    async function getTeamResults() {
      const fetchedTeamResults = await getTeamResultsPerYear(
        params.constructorId
      );
      setTeamResults(fetchedTeamResults);
      setLoading(false);
    }
    getTeamResults();
  }, [params.constructorId]);

  const [filterTable, handleFilterChange, applyFilter] = useTableFilter(
    teamResults?.MRData?.RaceTable.Races
  );

  const filteredTeamResults = applyFilter(teamResults?.MRData?.RaceTable.Races);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        {teamDetail?.MRData?.StandingsTable.StandingsLists[0].ConstructorStandings.map(
          (detail) => {
            const { position, points } = detail;
            const { constructorId, url, name, nationality } =
              detail.Constructor;
            return (
              <div key={constructorId}>
                <h2>
                  <img
                    style={{ width: 40, height: 20 }}
                    src={findFlagUrlByNationality(nationality)}
                    alt={nationality + "flag"}
                  />
                  {name}
                </h2>
                <p>Country: {nationality}</p>
                <p>Position: {position}</p>
                <p>POints: {points}</p>
                <p>
                  History: <a href={url}>Click here</a>
                </p>
              </div>
            );
          }
        )}
      </div>
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
            <th>Round</th>
            <th>Grand Prix</th>
            <th>Vettel</th>
            <th>Webber</th>
            <th>Points</th>
          </tr>
          {filteredTeamResults?.map((teamResult, i) => {
            const { raceName, round } = teamResult;
            const { position: positionVet, points: pointVet } =
              teamResult.Results[0];
            const { position: positionWeb, points: pointWeb } =
              teamResult.Results[1];
            const { country } = teamResult.Circuit.Location;
            return (
              <tr>
                <td>{i + 1}</td>
                <td>
                  <img
                    style={{ width: 40, height: 20 }}
                    src={findFlagUrlByCountryName(
                      country !== "Korea" ? country : "South Korea"
                    )}
                    alt={country + "flag"}
                  />
                  <Link to={`/races/${round}`}>{raceName}</Link>
                </td>
                <td>{positionVet}</td>
                <td>{positionWeb}</td>
                <td>{parseInt(pointVet) + parseInt(pointWeb)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
