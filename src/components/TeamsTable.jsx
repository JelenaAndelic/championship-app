import { Link } from "react-router-dom";
import { findFlagUrlByNationality } from "country-flags-svg";

const TeamsTable = (props) => {
  return (
    <>
      <div>TeamsTable</div>
      <table>
        <tbody>
          {props.teamData.MRData?.StandingsTable.StandingsLists[0].ConstructorStandings.map(
            (team, i) => {
              const { name, url, nationality, constructorId } =
                team.Constructor;
              const { points } = team;

              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <img
                      style={{ width: 40, height: 20 }}
                      src={findFlagUrlByNationality(nationality)}
                      alt={nationality + "flag"}
                    />
                    <Link to={constructorId}>{name}</Link>
                  </td>
                  <td>
                    <Link to={url}>Details</Link>
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

export default TeamsTable;
