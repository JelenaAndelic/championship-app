import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Races, { loader as racesLoader } from "./pages/Races";
import Teams, { loader as teamsLoader } from "./pages/Teams";
import Drivers, { loader as driversLoader } from "./pages/Drivers";
import Root from "./pages/Root";
import DriverDetails, {
  loader as DriverDetailsLoader,
} from "./pages/DriverDetails";
import TeamDetails, { loader as teamDetailLoader } from "./pages/TeamDetails";
import RacesDetails, { loader as raceDetailLoader } from "./pages/RacesDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <Drivers />, loader: driversLoader },
        {
          path: ":driverId",
          element: <DriverDetails />,
          loader: DriverDetailsLoader,
        },
        {
          path: "teams",
          element: <Teams />,
          loader: teamsLoader,
        },
        {
          path: "teams/:teamId",
          element: <TeamDetails />,
          loader: teamDetailLoader,
        },
        { path: "races", element: <Races />, loader: racesLoader },
        {
          path: "races/:raceId",
          element: <RacesDetails />,
          loader: raceDetailLoader,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
