import { findFlagUrlByCountryName } from "country-flags-svg";

const DriverDetailsTable = (props: any) => {
  console.log(props.data);
  return (
    <>
      <div>DriverDetailsTable</div>
      <table>
        <tbody>
          {props.data.MRData.RaceTable.Races.map(
            (driverResult: any, i: any) => {
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
            }
          )}
        </tbody>
      </table>
    </>
  );
};

export default DriverDetailsTable;
