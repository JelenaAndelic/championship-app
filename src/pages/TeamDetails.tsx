import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import TeamDetailsTable from "../components/TeamDetailsTable";

const TeamDetails = () => {
  const [teamInfo, setTeamInfo] = useState<any[]>([]);
  const teamDetailData: any = useLoaderData();

  const [teamDetail, teamDetailTable] = teamDetailData;

  const { name } =
    teamDetail.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]
      .Constructor;
  const { nationality } =
    teamDetail.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]
      .Constructor;
  const { points } =
    teamDetail.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0];
  const { position } =
    teamDetail.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0];
  const { url } =
    teamDetail.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]
      .Constructor;

  useEffect(() => {
    setTeamInfo([
      "Country:" + " " + nationality,
      "Position:" + " " + position,
      "Points:" + " " + points,
      url,
    ]);
  }, [setTeamInfo, nationality, position, points, url]);

  return (
    <>
      <div>{name}</div>
      <ul>
        {teamInfo.map((team, i) => {
          if (team.startsWith("http")) {
            return (
              <li key={i}>
                History: <Link to={team}>Details</Link>
              </li>
            );
          }
          return <li key={i}>{team}</li>;
        })}
      </ul>
      <TeamDetailsTable data={teamDetailTable} />
    </>
  );
};

export default TeamDetails;

export const loader = async ({ params }: { params: any }) => {
  try {
    const response = await fetch(
      `http://ergast.com/api/f1/2013/constructors/${params.teamId}/constructorStandings.json`
    );
    const tableResponse = await fetch(
      `http://ergast.com/api/f1/2013/constructors/${params.teamId}/results.json`
    );

    const tableData = await tableResponse.json();

    const data = await response.json();

    return [data, tableData];
  } catch (error) {
    console.log(error);
  }
};
