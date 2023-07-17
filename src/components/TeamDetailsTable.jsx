import { findFlagUrlByCountryName } from "country-flags-svg";

const TeamDetailsTable = (props) => {
  return (
    <>
      <div>TeamDetailsTable</div>
      <table>
        <tbody>
          {props.data.MRData.RaceTable.Races.map((teamResult, i) => {
            const { raceName } = teamResult;
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
                  {raceName}
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
