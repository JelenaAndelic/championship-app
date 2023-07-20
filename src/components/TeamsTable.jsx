import { Link } from "react-router-dom";
import { findFlagUrlByNationality } from "country-flags-svg";
import useTableFilter from "../hooks/useTableFilter";

const TeamsTable = (props) => {
  const [filterTable, handleFilterChange, applyFilter] = useTableFilter(
    props.teamData.MRData?.StandingsTable.StandingsLists[0].ConstructorStandings
  );

  const filteredTeams = applyFilter(
    props.teamData.MRData?.StandingsTable.StandingsLists[0].ConstructorStandings
  );

  return (
    <>
      <div>TeamsTable</div>
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
          {filteredTeams.map((team, i) => {
            const { name, url, nationality, constructorId } = team.Constructor;
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
          })}
        </tbody>
      </table>
    </>
  );
};

export default TeamsTable;
