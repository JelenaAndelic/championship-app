import { findFlagUrlByCountryName } from "country-flags-svg";
import useTableFilter from "../hooks/useTableFilter";

const DriverDetailsTable = (props) => {
  const [filterTable, handleFilterChange, applyFilter] = useTableFilter(
    props.data.MRData.RaceTable.Races
  );

  console.log(props);
  const filteredDrivers = applyFilter(props.data.MRData.RaceTable.Races);

  return (
    <>
      <div>DriverDetailsTable</div>
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
          {filteredDrivers.map((driverResult, i) => {
            const { raceName } = driverResult;
            const { grid } = driverResult.Results[0];
            const { name } = driverResult.Results[0].Constructor;
            const { position } = driverResult.Results[0];
            const { country } = driverResult.Circuit.Location;

            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <img
                    style={{ width: 40, height: 20 }}
                    src={findFlagUrlByCountryName(
                      country != "Korea" ? country : "South Korea"
                    )}
                  />{" "}
                  {raceName}
                </td>
                <td>{name}</td>
                <td>{grid}</td>
                <td>{position}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default DriverDetailsTable;
