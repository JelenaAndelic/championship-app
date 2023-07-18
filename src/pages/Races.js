import React from "react";
import { useGlobalContext } from "../context";
import { Loading } from "../components/Loading";
import { RaceList } from "../components/RaceList";

export const Races = () => {
  const { raceList, loading } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h1>Race Calendar</h1>
      <h2>Race Calendar - 2013</h2>
      <RaceList raceList={raceList} />
    </div>
  );
};
