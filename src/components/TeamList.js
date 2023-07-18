import React from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import { findFlagUrlByNationality } from "country-flags-svg";

const TeamList = () => {
  const { teamList } = useGlobalContext();

  return (
    <>
      <table>
        <tbody>
          {teamList.MRData?.StandingsTable.StandingsLists[0].ConstructorStandings.map(
            (team, i) => {
              const { points } = team;
              const { constructorId, url, name, nationality } =
                team.Constructor;
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
            }
          )}
        </tbody>
      </table>
    </>
  );
};

export default TeamList;
