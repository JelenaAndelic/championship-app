import { findFlagUrlByNationality } from "country-flags-svg";

const FirstRaceDetailsTable = (props) => {
  return (
    <>
      <div>Qualifyiers Table</div>
      <table>
        <tbody>
          {props.data.MRData?.RaceTable.Races[0].QualifyingResults.map(
            (race, i) => {
              const { familyName } = race.Driver;
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
                    {familyName}{" "}
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
            }
          )}
        </tbody>
      </table>
    </>
  );
};

export default FirstRaceDetailsTable;
