import { Link, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import FirstRaceDetailsTable from "../components/FirstRaceDetailsTable";
import SecondRaceDetailsTable from "../components/SecondRaceDetailsTable";
import { findFlagUrlByCountryName } from "country-flags-svg";
import externalLink from "../../public/external-link-svgrepo-com.svg";

const RacesDetails = () => {
  const [raceInfo, setRaceInfo] = useState([]);

  const raceFullDetailData = useLoaderData();

  const [raceDetailData, qualifyingData, resultsData] = raceFullDetailData;

  console.log(raceDetailData);
  const { raceName, date, url } = raceDetailData.MRData?.RaceTable.Races[0];
  const { locality: location, country } =
    raceDetailData.MRData?.RaceTable.Races[0].Circuit.Location;

  useEffect(() => {
    setRaceInfo([
      "Country:" + " " + country,
      "Location:" + " " + location,
      "Date:" + " " + date,
    ]);
  }, [setRaceInfo, country, location, date]);

  return (
    <>
      <div>
        <img
          style={{ width: 40, height: 20 }}
          src={findFlagUrlByCountryName(
            country != "Korea" ? country : "South Korea"
          )}
          alt={country + "flag"}
        />
        {raceName}
      </div>
      <ul>
        {raceInfo.map((race, i) => (
          <li key={i}>{race}</li>
        ))}
        <li>
          Full Report:{" "}
          <Link to={url}>
            <img style={{ width: 40, height: 20 }} src={externalLink} />
          </Link>
        </li>
      </ul>
      <FirstRaceDetailsTable data={qualifyingData} />
      <hr />
      <SecondRaceDetailsTable data={resultsData} />
    </>
  );
};

export default RacesDetails;

export const loader = async ({ params }) => {
  try {
    const response = await fetch(
      `https://ergast.com/api/f1/2013/${params.raceId}.json`
    );
    const responseQualifying = await fetch(
      `http://ergast.com/api/f1/2013/${params.raceId}/qualifying.json`
    );

    const responseResult = await fetch(
      `http://ergast.com/api/f1/2013/${params.raceId}/results.json`
    );

    const data = await response.json();
    const dataQualifying = await responseQualifying.json();
    const dataResults = await responseResult.json();

    return [data, dataQualifying, dataResults];
  } catch (error) {
    console.log(error);
  }
};
