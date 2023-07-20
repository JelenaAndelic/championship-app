import React from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import { findFlagUrlByNationality } from "country-flags-svg";
import useTableFilter from "../hooks/useTableFilter";

export const DriverList = () => {
  const { driverList } = useGlobalContext();
  const [filterTable, handleFilterChange, applyFilter] = useTableFilter(
    driverList.MRData.StandingsTable.StandingsLists[0].DriverStandings
  );

  const filteredDrivers = applyFilter(
    driverList.MRData.StandingsTable.StandingsLists[0].DriverStandings
  );

  return (
    <>
      <h2>Drivers Championship Standings - 2013</h2>
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
          {filteredDrivers.map((driver, i) => {
            const { driverId, givenName, familyName, nationality } =
              driver.Driver;
            const { points } = driver;
            const { name } = driver.Constructors[0];
            return (
              <tr key={driverId}>
                <td>{i + 1}</td>
                <td>
                  <img
                    style={{ width: 40, height: 20 }}
                    src={findFlagUrlByNationality(nationality)}
                    alt={nationality + "flag"}
                  />
                  <Link to={`${driverId}`}>
                    {givenName} {familyName}
                  </Link>
                </td>
                <td>{name}</td>
                <td>{points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
