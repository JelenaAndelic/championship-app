import React from "react";
import { useGlobalContext } from "../context";
import { findFlagUrlByCountryName } from "country-flags-svg";
import { Link } from "react-router-dom";

export const RaceList = () => {
  const { raceList } = useGlobalContext();

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Round</th>
            <th>Grand Prix</th>
            <th>Circuit</th>
            <th>Date</th>
            <th>Winner</th>
          </tr>
          {raceList.MRData?.RaceTable.Races.map((race, i) => {
            const { raceName, round, date } = race;
            const { circuitName, circuitId } = race.Circuit;
            const { familyName: winner } = race.Results[0].Driver;
            const { country } = race.Circuit.Location;

            return (
              <tr key={circuitId}>
                <td>{i + 1}</td>
                <td>
                  <img
                    style={{ width: 40, height: 20 }}
                    src={findFlagUrlByCountryName(
                      country !== "Korea" ? country : "South Korea"
                    )}
                    alt={country + "flag"}
                  />
                  <Link to={`${round}`}>{raceName}</Link>
                </td>
                <td>{circuitName}</td>
                <td>{date}</td>
                <td>{winner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
