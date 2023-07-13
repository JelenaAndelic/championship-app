import React from "react";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <ul>
      <li>
        <NavLink to="/">Drivers</NavLink>
      </li>
      <li>
        <NavLink to="teams">Teams</NavLink>
      </li>
      <li>
        <NavLink to="races">Races</NavLink>
      </li>
    </ul>
  );
};
