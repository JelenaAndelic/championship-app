import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { useState, useEffect } from "react";
import DriverDetailsTable from "../components/DriverDetailsTable";
import { findFlagUrlByNationality } from "country-flags-svg";
import externalLink from "../../public/external-link-svgrepo-com.svg";
import DataLoader from "../components/DataLoader";

const DriverDetails = () => {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  const [driverInfo, setDriverInfo] = useState([]);

  const driverDetailData = useLoaderData();

  const { name: team } =
    driverDetailData[0].MRData?.ConstructorTable.Constructors[0];
  const {
    givenName,
    url,
    familyName,
    dateOfBirth: birth,
    nationality,
  } = driverDetailData[1].MRData?.DriverTable.Drivers[0];

  const tableData = driverDetailData[2];

  useEffect(() => {
    setDriverInfo([
      "Nationality:" + " " + nationality,
      "Team:" + " " + team,
      "Birth:" + " " + birth,
    ]);
  }, [setDriverInfo, nationality, team, birth]);

  return (
    <>
      {!isSubmitting ? (
        <div>
          <div>
            <img
              style={{ width: 40, height: 20 }}
              src={findFlagUrlByNationality(nationality)}
              alt={nationality + "flag"}
            />
            {givenName} {familyName}
          </div>
          <ul>
            {driverInfo.map((driver, i) => (
              <li key={i}>{driver}</li>
            ))}
            <li>
              Biography:{" "}
              <Link to={url}>
                {" "}
                <img
                  style={{ width: 40, height: 20 }}
                  src={externalLink}
                />{" "}
              </Link>
            </li>
          </ul>
          <DriverDetailsTable data={tableData} />{" "}
        </div>
      ) : (
        <DataLoader />
      )}
    </>
  );
};

export default DriverDetails;

export const loader = async ({ params }) => {
  try {
    const response = await fetch(
      `https://ergast.com/api/f1/2013/drivers/${params.driverId}.json`
    );
    const responseTeam = await fetch(
      `https://ergast.com/api/f1/2013/drivers/${params.driverId}/constructors.json`
    );
    const resultResponse = await fetch(
      `http://ergast.com/api/f1/2013/drivers/${params.driverId}/results.json`
    );
    const dataTeam = await responseTeam.json();
    const dataInfo = await response.json();
    const dataResults = await resultResponse.json();
    const data = [dataTeam, dataInfo, dataResults];
    return data;
  } catch (error) {
    console.log(error);
  }
};
