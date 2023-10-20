import Home from "./pages/Home";
import Films from "./pages/Films";
import People from "./pages/People";
import Planets from "./pages/Planets";
import Species from "./pages/Species";
import Starships from "./pages/Starships";
import Vehicles from "./pages/Vehicles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Film from "./components/Film";
import Character from "./components/Character";

const App = () => {
  return (
    <div className="flex w-full h-full min-h-screen items-center justify-center bg-gray-800 text-yellow-300 px-5 md:px-0 gap-10">
      <Router>
        {/* <Sidebar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/films/" element={<Films />} />
          <Route path="/films/film/:id" element={<Film />} />
          <Route path="/people/" element={<People />} />
          <Route path="/people/:id" element={<Character />} />
          <Route path="/planets/" element={<Planets />} />
          <Route path="/species/" element={<Species />} />
          <Route path="/starships/" element={<Starships />} />
          <Route path="/vehicles/" element={<Vehicles />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
