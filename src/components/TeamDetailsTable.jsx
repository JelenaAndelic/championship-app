import { findFlagUrlByCountryName } from "country-flags-svg";
import useTableFilter from "../hooks/useTableFilter";
import { Link } from "react-router-dom";

const TeamDetailsTable = (props) => {
  const [filterTable, handleFilterChange, applyFilter] = useTableFilter(
    props.data.MRData.RaceTable.Races
  );

  const filteredTeams = applyFilter(props.data.MRData.RaceTable.Races);

  return (
    <>
      <div>Team Details Table</div>
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
          {filteredTeams.map((teamResult, i) => {
            const { raceName, round } = teamResult;
            const { position: positionVet, points: pointVet } =
              teamResult.Results[0];
            const { position: positionWeb, points: pointWeb } =
              teamResult.Results[1];
            const { country } = teamResult.Circuit.Location;

            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <img
                    style={{ width: 40, height: 20 }}
                    src={findFlagUrlByCountryName(
                      country != "Korea" ? country : "South Korea"
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

export default TeamDetailsTable;
