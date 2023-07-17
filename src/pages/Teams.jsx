import TeamsTable from "../components/TeamsTable";
import { useLoaderData } from "react-router-dom";

const Teams = () => {
  const teamStandings = useLoaderData();

  const { name } =
    teamStandings.MRData.StandingsTable.StandingsLists[0]
      .ConstructorStandings[0].Constructor;
  const { nationality } =
    teamStandings.MRData.StandingsTable.StandingsLists[0]
      .ConstructorStandings[0].Constructor;
  const { points } =
    teamStandings.MRData.StandingsTable.StandingsLists[0]
      .ConstructorStandings[0];
  const { url } =
    teamStandings.MRData.StandingsTable.StandingsLists[0]
      .ConstructorStandings[0].Constructor;

  return (
    <>
      <TeamsTable teamData={teamStandings} />
    </>
  );
};

export default Teams;

export const loader = async () => {
  try {
    const response = await fetch(
      "http://ergast.com/api/f1/2013/constructorStandings.json"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
