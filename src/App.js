import Home from "./pages/Home";
import Films from "./pages/Films";
import People from "./pages/People";
import Planets from "./pages/Planets";
import Starships from "./pages/Starships";
import Vehicles from "./pages/Vehicles";
import SpeciesP from "./pages/Species";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Film from "./components/Film";
import Character from "./components/Character";
import Planet from "./components/Planet";
import Vehicle from "./components/Vehicle";
import SpeciesC from "./components/Species";
import Starship from "./Starship";

const App = () => {
  return (
    <div className="flex w-full h-full min-h-screen justify-center bg-gray-800 text-yellow-300 px-5 md:px-0 gap-10">
      <Router>
        {/* <Sidebar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/films/" element={<Films />} />
          <Route path="/films/film/:id" element={<Film />} />
          <Route path="/people/" element={<People />} />
          <Route path="/people/:id" element={<Character />} />
          <Route path="/planets/" element={<Planets />} />
          <Route path="/planets/?page=:page" element={<Planets />} />
          <Route path="/planets/:id" element={<Planet />} />
          <Route path="/species/" element={<SpeciesP />} />
          <Route path="/species/:id" element={<SpeciesC />} />
          <Route path="/starships/" element={<Starships />} />
          <Route path="/starships/:id" element={<Starship />} />
          <Route path="/vehicles/" element={<Vehicles />} />
          <Route path="/vehicles/:id" element={<Vehicle />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
