import { Link } from "react-router-dom";

const DriversTable = (props: any) => {
  console.log(props.drivers);
  return (
    <>
      <div>DriversTable</div>
      <table>
        <tbody>
          {props.drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(
            (driver: any) => {
              const {
                driverId,
                givenName,
                familyName,
                dateOfBirth,
                nationality,
              } = driver.Driver;
              const { points } = driver;
              const { name } = driver.Constructors[0];

              return (
                <tr key={driverId}>
                  <td>
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
