import { Link } from "react-router-dom";

const RacesTable = (props: any) => {
  return (
    <>
      <div>Races Table</div>
      <table>
        <tbody>
          {props.data.MRData?.RaceTable.Races.map((race: any, i: any) => {
            const { raceName } = race;
            const { circuitName } = race.Circuit;
            const { date } = race;
            const { familyName: winner } = race.Results[0].Driver;
            const { round } = race;

            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
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
