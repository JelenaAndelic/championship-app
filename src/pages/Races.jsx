import { useLoaderData } from "react-router-dom";
import RacesTable from "../components/RacesTable";

const Races = () => {
  const racesData = useLoaderData();

  return (
    <>
      <RacesTable data={racesData} />
    </>
  );
};

export default Races;

export const loader = async () => {
  try {
    const response = await fetch(
      "https://ergast.com/api/f1/2013/results/1.json"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
