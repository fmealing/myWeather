import React, { useState, useEffect } from "react";
import { getWeatherByCoordinates } from "../services/weatherService";
import { PulseLoader } from "react-spinners";
import FourDayWeatherComponent from "./FourDayWeatherComponent";

const FourDayWeather = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            fetchWeatherByCoordinates(latitude, longitude);
          },
          (err) => {
            setError(err.message);
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    const fetchWeatherByCoordinates = async (latitude, longitude) => {
      try {
        setLoading(true);
        const weatherData = await getWeatherByCoordinates(latitude, longitude);
        setWeather(weatherData);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  return (
    <div>
      {loading && <PulseLoader color="#007bff" size={150} />}
      {error && <p>Error: {error}</p>}
      {weather && (
        <FourDayWeatherComponent weather={weather} location={location} />
      )}
    </div>
  );
};

export default FourDayWeather;
