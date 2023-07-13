import React from "react";
import { useGlobalContext } from "../context";
import { DriverList } from "../components/DriverList";
import { Loading } from "../components/Loading";

export const Drivers = () => {
  const { loading, driverList } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h1>Drivers Championship</h1>
      <DriverList driverList={driverList} />
    </div>
  );
};
