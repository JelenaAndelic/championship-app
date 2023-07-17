import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import FirstRaceDetailsTable from "../components/FirstRaceDetailsTable";
import SecondRaceDetailsTable from "../components/SecondRaceDetailsTable";

const RacesDetails = () => {
  const [raceInfo, setRaceInfo] = useState<any[]>([]);

  const raceFullDetailData: any = useLoaderData();

  const [raceDetailData, qualifyingData, resultsData] = raceFullDetailData;

  const { raceName } = raceDetailData.MRData?.RaceTable.Races[0];
  const { locality: location, country } =
    raceDetailData.MRData?.RaceTable.Races[0].Circuit.Location;
  const { date } = raceDetailData.MRData?.RaceTable.Races[0];

  useEffect(() => {
    setRaceInfo([
      "Country:" + " " + country,
      "Location:" + " " + location,
      "Date:" + " " + date,
    ]);
  }, [setRaceInfo, country, location, date]);

  return (
    <>
      <div>{raceName}</div>
      <ul>
        {raceInfo.map((race, i) => (
          <li key={i}>{race}</li>
        ))}
      </ul>
      <FirstRaceDetailsTable data={qualifyingData} />
      <hr />
      <SecondRaceDetailsTable data={resultsData} />
    </>
  );
};

export default RacesDetails;

export const loader = async ({ params }: { params: any }) => {
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
