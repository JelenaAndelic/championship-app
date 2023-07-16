const DriverDetailsTable = (props: any) => {
  console.log(props.data);
  return (
    <>
      <div>DriverDetailsTable</div>;
      <table>
        <tbody>
          {props.data.MRData.RaceTable.Races.map(
            (driverResult: any, i: any) => {
              const { raceName } = driverResult;
              const { grid } = driverResult.Results[0];
              const { name } = driverResult.Results[0].Constructor;
              const { position } = driverResult.Results[0];

              return (
                <tr key={i}>
                  <td>{raceName}</td>
                  <td>{grid}</td>
                  <td>{name}</td>
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
