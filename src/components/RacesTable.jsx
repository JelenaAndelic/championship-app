import { Link } from "react-router-dom";
import { findFlagUrlByCountryName } from "country-flags-svg";

const RacesTable = (props) => {
  return (
    <>
      <div>Races Table</div>
      <table>
        <tbody>
          {props.data.MRData?.RaceTable.Races.map((race, i) => {
            const { raceName, round, date } = race;
            const { circuitName } = race.Circuit;
            const { familyName: winner } = race.Results[0].Driver;
            const { country } = race.Circuit.Location;

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
                  <Link to={`${round}`}>{raceName}</Link>
                </td>
                <td>{circuitName}</td>
                <td>{date}</td>
                <td>{winner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default RacesTable;
