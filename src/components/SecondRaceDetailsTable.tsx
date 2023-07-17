import React from "react";

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
              let time = null;
              if (race.Time.time) {
                time = race.Time.time;
              }

              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    {familyName} {nationality}
                  </td>
                  <td>{team}</td>
                  <td>{time ? time : ""}</td>
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
