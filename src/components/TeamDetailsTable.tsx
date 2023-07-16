import React from "react";

const TeamDetailsTable = (props: any) => {
  console.log(props.data);
  return (
    <>
      <div>TeamDetailsTable</div>
      <table>
        <tbody>
          {props.data.MRData.RaceTable.Races.map((teamResult: any, i: any) => {
            const { raceName } = teamResult;
            const { position: positionVet } = teamResult.Results[0];
            const { position: positionWeb } = teamResult.Results[1];
            const { points: pointVet } = teamResult.Results[0];
            const { points: pointWeb } = teamResult.Results[1];
            console.log(pointVet);
            return (
              <tr key={i}>
                <td>{raceName}</td>
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
