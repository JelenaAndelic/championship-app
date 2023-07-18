import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navigation } from "./components/Navigation";
import { Drivers } from "./pages/Drivers";
import { Teams } from "./pages/Teams";
import { Races } from "./pages/Races";
import { DriverDetail } from "./components/DriverDetail";
import { TeamDetail } from "./components/TeamDetail";
import { RaceDetail } from "./components/RaceDetail";

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Drivers />} />
          <Route path=":driverId" element={<DriverDetail />} />
          <Route path="teams" element={<Teams />} />
          <Route path="teams/:constructorId" element={<TeamDetail />} />
          <Route path="races" element={<Races />} />
          <Route path="races/:raceId" element={<RaceDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
