import React from "react";
import { useGlobalContext } from "../context";
import { Loading } from "../components/Loading";
import TeamList from "../components/TeamList";

export const Teams = () => {
  const { loading, teamList } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Constructors Championship</h1>
      <TeamList teamList={teamList} />
    </div>
  );
};
