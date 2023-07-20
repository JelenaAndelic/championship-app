import { findFlagUrlByNationality } from "country-flags-svg";
import useTableFilter from "../hooks/useTableFilter";
import { Link } from "react-router-dom";

const FirstRaceDetailsTable = (props) => {
  const [filterTable, handleFilterChange, applyFilter] = useTableFilter(
    props.data.MRData?.RaceTable.Races[0].QualifyingResults
  );

  const filteredRaces = applyFilter(
    props.data.MRData?.RaceTable.Races[0].QualifyingResults
  );

  return (
    <>
      <div>Qualifyiers Table</div>
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
          {filteredRaces.map((race, i) => {
            const { familyName, driverId } = race.Driver;
            const { name: team } = race.Constructor;
            const { nationality } = race.Driver;
            const times = [race.Q1, race.Q2, race.Q3];
            let bestTime = null;

            for (let time of times) {
              if (time) {
                if (!bestTime || time < bestTime) {
                  bestTime = time;
                }
              }
            }
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <Link to={`/${driverId}`}> {familyName} </Link>
                  <img
                    style={{ width: 40, height: 20 }}
                    src={findFlagUrlByNationality(nationality)}
                    alt={nationality + "flag"}
                  />
                </td>
                <td>{team}</td>
                <td>{bestTime}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default FirstRaceDetailsTable;
