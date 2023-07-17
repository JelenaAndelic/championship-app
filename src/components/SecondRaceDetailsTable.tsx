import { findFlagUrlByNationality } from "country-flags-svg";

const SecondRaceDetailsTable = (props: any) => {
  return (
    <>
      <div>Qualifyiers Table</div>
      <table>
        <tbody>
          {props.data.MRData?.RaceTable.Races[0].Results.map(
            (race: any, i: any) => {
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
            }
          )}
        </tbody>
      </table>
    </>
  );
};

export default SecondRaceDetailsTable;
