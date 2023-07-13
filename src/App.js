import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navigation } from "./components/Navigation";
import { Drivers } from "./pages/Drivers";
import { Teams } from "./pages/Teams";
import { Races } from "./pages/Races";
import { DriverDetail } from "./components/DriverDetail";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Drivers />} />
          <Route path=":driverId" element={<DriverDetail />} />
          <Route path="teams" element={<Teams />} />
          <Route path="races" element={<Races />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
