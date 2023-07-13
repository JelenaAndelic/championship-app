import React, { useState, useEffect } from "react";
import { getDriverDetails, getDriverRaces } from "../api/driverApi";
import { useGlobalContext } from "../context";
import { useParams } from "react-router-dom";
import { Loading } from "./Loading";

export const DriverDetail = () => {
  const { loading, setLoading, driverList } = useGlobalContext();
  const [driverDetail, setDriverDetail] = useState([]);
  const [driverRaces, setDriverRaces] = useState([]);

  const params = useParams();

  useEffect(() => {
    setLoading(true);
    async function getDetails() {
      const fetchedDetails = await getDriverDetails(params.driverId);
      setDriverDetail(fetchedDetails);
      setLoading(false);
    }
    getDetails();
  }, [params.driverId]);

  useEffect(() => {
    async function getRaces() {
      const fetchedRaces = await getDriverRaces(params.driverId);
      setDriverRaces(fetchedRaces);
      console.log(fetchedRaces);
    }
    getRaces();
  }, []);

  // const racesOfDrivers = driverRaces.MRData?.RaceTable.Races.map((races) => {
  //   const { raceName } = races;
  //   const { position, grid } = races.Results[0];
  //   console.log(raceName, position, grid);
  // });

  // console.log(racesOfDrivers);

  const allDrivers =
    driverList.MRData?.StandingsTable.StandingsLists[0].DriverStandings.map(
      (driver) => driver
    );

  const specificDriver = allDrivers?.find(
    (driver) => driver.Driver.driverId === params.driverId
  );

  const specificTeam = specificDriver?.Constructors[0].name;

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        {driverDetail.MRData?.DriverTable.Drivers.map((detail) => {
          const {
            driverId,
            givenName,
            familyName,
            url,
            dateOfBirth,
            nationality,
          } = detail;
          return (
            <div key={driverId}>
              <h2>
                {givenName} {familyName}
              </h2>
              <h3>{dateOfBirth}</h3>
              <h3>{nationality}</h3>
              <a href={url}>Biography</a>
              <h3>{specificTeam}</h3>
            </div>
          );
        })}
      </div>
      <table>
        <tbody>
          <tr>
            <th>Grand Prix</th>
            <th>Team</th>
            <th>Grid</th>
            <th>Race</th>
          </tr>
          {driverRaces.MRData?.RaceTable.Races.map((races) => {
            const { raceName } = races;
            const { position, grid } = races.Results[0];
            const { driverId } = races.Results[0].Driver;
            console.log(raceName, position, grid);
            return (
              <tr>
                <td>{raceName}</td>
                <td>{specificTeam}</td>
                <td>{grid}</td>
                <td>{position}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
