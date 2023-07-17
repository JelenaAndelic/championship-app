import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import TeamDetailsTable from "../components/TeamDetailsTable";
import { findFlagUrlByNationality } from "country-flags-svg";
import externalLink from "../../public/external-link-svgrepo-com.svg";

const TeamDetails = () => {
  const [teamInfo, setTeamInfo] = useState([]);
  const teamDetailData = useLoaderData();

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
      <div>
        <img
          style={{ width: 40, height: 20 }}
          src={findFlagUrlByNationality(nationality)}
          alt={nationality + "flag"}
        />
        {name}
      </div>
      <ul>
        {teamInfo.map((team, i) => {
          if (team.startsWith("http")) {
            return (
              <li key={i}>
                History:{" "}
                <Link to={team}>
                  <img style={{ width: 40, height: 20 }} src={externalLink} />
                </Link>
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

export const loader = async ({ params }) => {
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
