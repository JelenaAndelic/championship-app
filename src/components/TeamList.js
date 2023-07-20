import React from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import { findFlagUrlByNationality } from "country-flags-svg";
import useTableFilter from "../hooks/useTableFilter";

const TeamList = () => {
  const { teamList } = useGlobalContext();
  const [filterTable, handleFilterChange, applyFilter] = useTableFilter(
    teamList.MRData?.StandingsTable.StandingsLists[0].ConstructorStandings
  );

  const filteredTeams = applyFilter(
    teamList.MRData?.StandingsTable.StandingsLists[0].ConstructorStandings
  );

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
          {filteredTeams?.map((team, i) => {
            const { points } = team;
            const { constructorId, url, name, nationality } = team.Constructor;
            return (
              <tr key={constructorId}>
                <td>{i + 1}</td>
                <Link to={`${constructorId}`}>
                  <td>
                    <img
                      style={{ width: 40, height: 20 }}
                      src={findFlagUrlByNationality(nationality)}
                      alt={nationality + "flag"}
                    />
                    {name}
                  </td>
                </Link>
                <td>
                  <a href={url}>Details</a>
                </td>
                <td>{points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TeamList;
