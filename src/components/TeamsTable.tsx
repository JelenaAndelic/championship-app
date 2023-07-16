import { Link } from "react-router-dom";

const TeamsTable = (props: any) => {
  return (
    <>
      <div>TeamsTable</div>
      <table>
        <tbody>
          {props.teamData.MRData?.StandingsTable.StandingsLists[0].ConstructorStandings.map(
            (team: any, i: any) => {
              const { name } = team.Constructor;
              const { url } = team.Constructor;
              const { points } = team;
              const { constructorId } = team.Constructor;

              return (
                <tr key={i}>
                  <td>
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
