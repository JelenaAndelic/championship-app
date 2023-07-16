import { NavLink } from "react-router-dom";

const MainNavigation = () => {
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

export default MainNavigation;
