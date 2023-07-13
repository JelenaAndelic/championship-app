import React from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

export const DriverList = () => {
  const { driverList } = useGlobalContext();
  return (
    <>
      <table>
        <tbody>
          {driverList.MRData?.StandingsTable.StandingsLists[0].DriverStandings.map(
            (driver) => {
              const { driverId, givenName, familyName } = driver.Driver;
              const { points } = driver;
              const { name } = driver.Constructors[0];
              return (
                <tr key={driverId}>
                  <td>
                    <Link to={`${driverId}`}>
                      {givenName} {familyName}
                    </Link>
                  </td>
                  <td>{name}</td>
                  <td>{points}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </>
  );
};
