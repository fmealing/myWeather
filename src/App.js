import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Weather from "./components/Weather";
import Home from "./components/Home";
import FourDayWeather from "./components/FourDayWeather";
import "./styles/index.css";

function App() {
  return (
    <div className="App">
      <nav className="navigation">
        <ul className="navigation-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/current">Current Weather</Link>
          </li>
          <li>
            <Link to="/four-day">4-Day Forecast</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/current" element={<Weather />} />
        <Route path="/four-day" element={<FourDayWeather />} />
      </Routes>
    </div>
  );
}

export default App;
