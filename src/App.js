import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Weather from "./components/Weather";
import Home from "./components/Home";
import FourDayWeather from "./components/FourDayWeather";
import { useDarkMode } from "./DarkModeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import "./styles/index.css";

function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

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
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? <FaSun /> : <FaMoon />}
          {darkMode ? " Switch to Light Mode" : " Switch to Dark Mode"}
        </button>
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
