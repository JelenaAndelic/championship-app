import { useLoaderData } from "react-router-dom";

import DriversTable from "../components/DriversTable";

const Drivers = () => {
  const driversData = useLoaderData();

  return (
    <>
      <DriversTable drivers={driversData} />
    </>
  );
};

export default Drivers;

export const loader = async () => {
  try {
    const response = await fetch(
      "https://ergast.com/api/f1/2013/driverStandings.json"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
