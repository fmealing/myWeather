import React from "react";
import "../styles/home.css";
import { FaCloudSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/current"); // navigates to current weather page
  };

  return (
    <div className="home-container">
      <div className="overlay">
        <div className="content">
          <FaCloudSun size={100} />
          <h1 className="h1--home">Welcome to the Weather App</h1>
          <p className="p--home">
            Select an option from the navigation menu to view the weather
            information.
          </p>
          <button className="cta-button" onClick={handleButtonClick}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
