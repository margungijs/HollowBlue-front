import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import LoginRegister from "./pages/LoginRegister"
import Landing from "./pages/Landing";
import GameHard from "./pages/Game-hard";
import Game from "./pages/Game";
import Levels from "./pages/Levels";
import ClickDetector from "./pages/ClickDetector";
import Dashboard from "./pages/Dashboard";
import PurchaseCredits from "./pages/PurchaseCredits";
import WordGame from "./pages/WordGame";
import NumberGame from "./pages/NumberGame";

function App() {
  return (
    <Router>
        <Routes>
            <Route exact path = "/Auth" element = { <LoginRegister /> }/>
            <Route exact path = "/" element = { <Landing /> }/>
            <Route exact path = "/GameHard/:level" element = { <GameHard /> }/>
            <Route exact path = "/Game/:level" element = { <Game /> }/>
            <Route exact path = "/Levels" element = { <Levels  /> }/>
            <Route exact path = "/Wordgame/:level" element = { <WordGame  /> }/>
            <Route exact path = "/Numbergame/:level" element = { <NumberGame  /> }/>
            <Route exact path = "/Dashboard" element = { <Dashboard  /> }/>
            <Route exact path = "/Purchase" element = { <PurchaseCredits /> }/>
        </Routes>
    </Router>
  );
}

export default App;
