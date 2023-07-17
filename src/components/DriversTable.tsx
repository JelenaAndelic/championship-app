import { Link } from "react-router-dom";
import { findFlagUrlByNationality } from "country-flags-svg";

const DriversTable = (props: any) => {
  console.log(props.drivers);
  return (
    <>
      <div>DriversTable</div>
      <table>
        <tbody>
          {props.drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(
            (driver: any, i: any) => {
              const { driverId, givenName, familyName, nationality } =
                driver.Driver;
              const { points } = driver;
              const { name } = driver.Constructors[0];

              return (
                <tr key={driverId}>
                  <td>{i + 1}</td>
                  <td>
                    <img
                      style={{ width: 40, height: 20 }}
                      src={findFlagUrlByNationality(nationality)}
                      alt={nationality + "flag"}
                    />
                    <Link to={`${driverId}`}>
                      {" "}
                      {givenName} {familyName}
                    </Link>
                  </td>
                  <td>{name}</td>
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

export default DriversTable;
