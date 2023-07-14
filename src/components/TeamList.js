import React from "react";
import { useGlobalContext } from "../context";

const TeamList = () => {
  const { teamList } = useGlobalContext();

  return (
    <>
      <table>
        <tbody>
          {teamList.MRData?.StandingsTable.StandingsLists[0].ConstructorStandings.map(
            (team) => {
              const { points } = team;
              const { url, name } = team.Constructor;
              return (
                <tr>
                  <td>{name}</td>
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
