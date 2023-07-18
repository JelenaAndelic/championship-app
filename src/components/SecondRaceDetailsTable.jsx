import { findFlagUrlByNationality } from "country-flags-svg";
import useTableFilter from "../hooks/useTableFilter";

const SecondRaceDetailsTable = (props) => {
  const [filterTable, handleFilterChange, applyFilter] = useTableFilter(
    props.data.MRData?.RaceTable.Races[0].Results
  );

  const filteredDrivers = applyFilter(
    props.data.MRData?.RaceTable.Races[0].Results
  );
  return (
    <>
      <div>Race Results</div>
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
          {filteredDrivers.map((race, i) => {
            const { familyName } = race.Driver;
            const { name: team } = race.Constructor;
            const { nationality } = race.Driver;
            const { time } = race.Time || { time: null };
            const { status } = race;
            const { points } = race;

            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  {familyName}{" "}
                  <img
                    style={{ width: 40, height: 20 }}
                    src={findFlagUrlByNationality(nationality)}
                    alt={nationality + "flag"}
                  />
                </td>
                <td>{team}</td>
                <td>{time ? time : status}</td>
                <td>{points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SecondRaceDetailsTable;
